import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';

import FirebaseService from '../../services/FirebaseService';

import Header from '../partials/Header';
import Footer from '../partials/Footer';

import './styles.css';

const Partners = () => {

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [partners, setPartners] = useState([]);

    const [filter, setFilter] = useState({
        uf: '',
        city: ''
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        // load cities always when the uf changes
        if (selectedUf === '0') {
            return;
        }

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);

    useEffect(() => {
        const partners = FirebaseService.getDataList('parceiros', (dataReceived) => {
            setPartners(dataReceived);
        });
    }, []);

    function handleSelectUf(event) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectCity(event) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleShowMore(event) {
        const li = event.target.parentNode.parentNode;

        if (li.children[1].style.display == "none") {
            li.children[1].style.display = "block";
        } else {
            li.children[1].style.display = "none";
        }

    }

    function handleSubmit(event) {
        event.preventDefault();

        var filter = {
            uf: selectedUf,
            city: selectedCity
        };

        const partners = FirebaseService.getDataListFiltered('parceiros', filter, (dataReceived) => {
            setPartners(dataReceived);
        });
    }

    return (
        <section className="wrapper">
            <Header page="Partners" />

            {/* search_container */}
            <div className="search_container container">
                <div className="content">
                    <h1>Pesquise um dos nossos parceiros próximos</h1>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="field-group">

                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select
                                    onChange={handleSelectUf}
                                    name="uf"
                                    id="uf"
                                    required
                                    value={selectedUf}
                                >
                                    <option value="0">Selecione uma UF</option>
                                    {ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select
                                    name="city"
                                    id="city"
                                    value={selectedCity}
                                    required
                                    onChange={handleSelectCity}
                                >
                                    <option value="0">Selecione uma cidade</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit">Filtrar</button>
                    </form>
                </div>
            </div>
            {/* search_container */}

            {/* partners_list */}
            <div className="partners_list_container">
                <div className="content">
                    <ul>
                        {partners.map(partner => (
                            <li key={partner.key}>
                                <div className="header">
                                    <h2>{partner.name}</h2>
                                    <button onClick={handleShowMore}>Ver Mais</button>
                                </div>
                                <div className="info">
                                    <div className="field">
                                        <strong>Email:</strong>
                                        <p>{partner.email}</p>
                                    </div>
                                    <div className="field">
                                        <strong>WhatsApp</strong>
                                        <p>{partner.whatsapp}</p>
                                    </div>
                                    <div className="field">
                                        <strong>Cidade:</strong>
                                        <p>{partner.city}</p>
                                    </div>
                                    <div className="field">
                                        <strong>UF:</strong>
                                        <p>{partner.uf}</p>
                                    </div>

                                    <Map center={[partner.latitude, partner.longitude]} zoom={15}>
                                        <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />

                                        <Marker position={[partner.latitude, partner.longitude]} />
                                    </Map>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* partners_list */}

            <Footer />
        </section>
    );
}

export default Partners;