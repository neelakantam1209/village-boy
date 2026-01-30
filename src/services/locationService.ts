import { CITIES } from '@/lib/data';
import type { City } from '@/lib/types';
import { collection, getDocs, Firestore, writeBatch, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export async function getAllCities(db: Firestore): Promise<City[]> {
  const citiesCol = collection(db, 'cities');
  return getDocs(citiesCol).then(async (citySnapshot) => {
    if (citySnapshot.empty) {
        // Populate with mock data if the collection is empty
        const batch = writeBatch(db);
        CITIES.forEach(city => {
            const docRef = doc(db, 'cities', city.id);
            batch.set(docRef, city);
        });
        await batch.commit();
        return CITIES;
    }
    return citySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as City));
  }).catch(error => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'cities',
          operation: 'list',
      }));
      return CITIES; // Return mock data as a fallback
  });
}
