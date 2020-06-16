import { firebaseDatabase } from '../utils/firebaseUtils';

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {
        let query = firebaseDatabase.ref(nodePath).limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    }

    static getDataListFiltered = (nodePath, filter, callback, size = 10) => {
        let query = firebaseDatabase.ref(nodePath).orderByChild('city').equalTo(filter.city).limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                if (item.uf === filter.uf) {
                    item['key'] = childSnapshot.key;
                    items.push(item);
                }
            });
            callback(items);
        });

        return query;
    }

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    }
}