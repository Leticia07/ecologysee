import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import swal from 'sweetalert';

import FirebaseService from "../../services/FirebaseService";

import Header from '../partials/Header';
import Footer from '../partials/Footer';

import './style.css';
import ods from '../../assets/ods1.png';
import desenvolvimento from '../../assets/desenvolvimento.jpg';

const Home = () => {

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);

    const [intialPosition, setInitialPosition] = useState([0, 0]);
    const [partners, setPartners] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedPosition, setSelectedPosition] = useState([0, 0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        const partners = FirebaseService.getDataList('parceiros', (dataReceived) => {
            setPartners(dataReceived);
        });
    }, []);

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

    function handleSelectUf(event) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectCity(event) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleMapClick(event) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event) {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude
        }

        const newid = FirebaseService.pushData('parceiros', data);

        if (newid) {
            swal("Você agora é um parceiro!", "Obrigado por se cadastrar na nossa plataforma. Agora tornaremos a coleta mais fácil e rápida.", "success");
        }

        setFormData({
            name: '',
            email: '',
            whatsapp: ''
        });
        setSelectedCity("");
        setSelectedUf("");
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
            setSelectedPosition([
                0, 0
            ])
        });
    }

    return (
        <div className="wrapper">
            <div className="home_container">
                <Header page="Home" />
            </div>
            {/* welcome_container */}
            <div className="welcome_container">
                <h1>Bem Vindo à</h1>
                <h1 style={{ "font-family": "Roboto" }}>ecology<span style={{ "color": "rgb(204, 235, 211)" }}>see</span></h1>
            </div>
            {/* welcome_container */}
            {/* about_us_container */}
            <div id="about_us" className="about_us_container container">
                <div className="content">
                    <h1>Quem Somos</h1>
                    <br />
                    <p>Nós somos a Ecologysee! O conceito que trazemos no nosso nome é o de visualizar a ecologia de uma forma mais sustentável, mais rentável e mais eficaz. Trazemos como proposta a criação de um novo verbo brincando com as duas palavras da língua inglesa "ecology" e "see" e para assim fazermos um convite a todos: ECOLOGYSEE!  </p>
                    <p>Parte do nosso conceito é a criação de uma rede coorporativa pegando o ciclo do lixo que já algo que existe e formar uma cadeia. Encontrar e armazenar os dados de todos os participantes dessa cadeia. Dentro da nossa plataforma nós temos: coletores de lixo, grandes e pequenos empresários, donas de casa, universitários, estudantes e indústrias de bens de consumo. Todos os participantes dessa cadeia existente são realocados e reorganizados possibilitando a todos: benefícios, um serviço de coleta e armazenamento de lixo eficaz.</p>
                </div>
            </div>
            {/* about_us_container */}
            {/* understand */}
            <div id="understand" className="understand">
                <h1 className="title">Entendendo alguns conceitos</h1>
                {/* ods_container */}
                <div className="ods_container container">
                    <div className="ods_content content">
                        <div className="part">
                            <img src={ods} alt="" />
                        </div>
                        <div className="part">
                            <h1>Entenda o que são as ODS da ONU</h1>
                            <p>Os Objetivos de Desenvolvimento Sustentável, também chamado de ODS são uma iniciativa da Organização das Nações Unidas (ONU) da sua agenda socioambiental voltado para a mudança do mundo até o ano de 2030. A Agenda 2030 é um plano de ação para o desenvolvimento sustentável destinado as pessoas, ao planeta e a prosperidade de ambos.</p>
                            <p>Este plano estabelece 17 Objetivos para o desenvolvimento sustentável e ainda prevê 169 metas, para a erradicação da pobreza, promoção de vida digna para todos, entre outros, tendo como limite os recursos renováveis do planeta.</p>
                            <p>Os objetivos são:</p>
                            <ol>
                                <li>Erradicação da Pobreza</li>
                                <li>Fome zero e Agricultura Sustentável</li>
                                <li>Saúde e Bem-Estar</li>
                                <li>Educação de Qualidade</li>
                                <li>Igualdade de Gênero</li>
                                <li>Água Potável e Saneamento</li>
                                <li>Energia Limpa e Acessível</li>
                                <li>Trabalho Decente e Crescimento Econômico</li>
                                <li>Indústria, Inovação e Infraestrutura</li>
                                <li>Redução das Desigualdades</li>
                                <li>Cidades e Comunidades Sustentáveis</li>
                                <li>Consumo e Produção Responsáveis</li>
                                <li>Ação Contra a Mundança Global do Clima</li>
                                <li>Vida na Água</li>
                                <li>Vida Terrestre</li>
                                <li>Paz, Justiça e Instituições Eficazes</li>
                                <li>Parcerias e Meios de Implementação</li>
                            </ol>
                            <p>Para saber mais sobre os Objetivos de Desenvolvimento Sustentável <a target="_blank" href="https://nacoesunidas.org/pos2015/agenda2030/">Clique Aqui.</a></p>
                        </div>
                    </div>
                </div>
                {/* ods_container */}
                {/* sustainable_container*/}
                <div className="sustainable_container container">
                    <div className="sustainable_content content">
                        <div className="part">
                            <img src={desenvolvimento} alt="" />
                        </div>
                        <div className="part">
                            <h1>Desenvolvimento Sustentável</h1>
                            <p>Entende-se por desenvolvimento sustentável a capacidade de utilizar os recursos e os bens da natureza sem comprometer a disponibilidade desses elementos para as gerações futuras.</p>
                            <p>Em abril de 1987, a Comissão Brundtland, publicou um relatório invovador, "Nosso Futuro Comum" e traz o conceito de desenvolvimento sustentável para o discurso público. Algumas das ideias foram:</p>
                            <p>"O desenvolvimento sustentável é o desenvolvimento que encontra as necessidades atuais sem comprometer a habilidade das futuras gerações de atender suas próprias necessidades."</p>
                            <p>"Um mundo onde a pobreza e a desigualdade são endêmicas estará sempre propenso à crises ecológicas, entre outras... O desenvolvimento sustentável requer que as sociedades atendam às necessidades humanas tanto pelo aumento do potencial produtivo como pela garantia de oportunidades iguais para todos."</p>
                            <p>Você pode ler mais sobre desenvolvimento sustentável <a target="_blank" href="https://nacoesunidas.org/acao/meio-ambiente/">clicando aqui</a>.</p>
                        </div>
                    </div>
                </div>
                {/* sustainable_container*/}
            </div>
            {/* understand */}

            {/* search_partners */}
            <div id="our_partners" className="search_partners_container container">
                <div className="content">
                    <h1>Nossos Parceiros</h1>
                    <Map center={[-10.9228727,-37.1127737]} zoom={3.5}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {partners.map( partner => (
                            <Marker key={partner.key} position={[partner.latitude, partner.longitude]} >
                                <Popup>{partner.name}</Popup>
                            </Marker>
                        ))}
                    </Map>
                    <div className="button">
                        <Link to="/parceiros">Ver Mais Nossos Parceiros</Link>
                    </div>
                </div>
            </div>
            {/* search_partners */}

            {/* partner */}
            <div id="partner" className="partner">
                {/* partner_container */}
                <div className="partner_container container">
                    <div className="content">
                        <h1>Sua empresa realiza coleta?</h1>
                        <p>Cadastre-se na nossa plataforma e seja um parceiro!</p>
                        <br />
                        <form onSubmit={handleSubmit} action="">
                            <fieldset>
                                <legend>
                                    <h2>Dados</h2>
                                </legend>

                                <div className="field">
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="field-group">
                                    <div className="field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="whatsapp">WhatsApp</label>
                                        <input
                                            type="text"
                                            name="whatsapp"
                                            id="whatsapp"
                                            value={formData.whatsapp}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>
                                    <h2>Endereço</h2>
                                    <span>Selecione o endereço no mapa</span>
                                </legend>

                                <Map center={intialPosition} zoom={15} onClick={handleMapClick}>
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker position={selectedPosition} />
                                </Map>

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
                                            <option value="">Selecione uma UF</option>
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
                                            <option value="">Selecione uma cidade</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                            <button type="submit">Tornar-se Parceiro</button>
                        </form>
                    </div>
                </div>
                {/* partner_container */}
            </div>
            {/* partner */}

            <Footer />
        </div>
    );
}

export default Home;