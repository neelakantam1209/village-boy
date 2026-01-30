
import { PROFESSIONALS } from '@/lib/data';
import type { Professional } from '@/lib/types';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, Firestore, writeBatch } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export async function getAllWorkers(db: Firestore): Promise<Professional[]> {
  const workersCol = collection(db, 'workers');
  return getDocs(workersCol).then(async (workerSnapshot) => {
    if (workerSnapshot.empty) {
      // Populate with mock data if the collection is empty
      const batch = writeBatch(db);
      PROFESSIONALS.forEach(worker => {
        const docRef = doc(db, 'workers', worker.id);
        batch.set(docRef, worker);
      });
      await batch.commit();
      return PROFESSIONALS;
    }
    return workerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Professional));
  }).catch(error => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'workers',
          operation: 'list',
      }));
      return PROFESSIONALS;
  });
}

export function addWorker(db: Firestore, workerData: Omit<Professional, 'id'>) {
    const newDocRef = doc(collection(db, 'workers'));
    const dataWithId = { ...workerData, id: newDocRef.id };
    setDoc(newDocRef, dataWithId)
        .catch(error => {
            errorEmitter.emit(
                'permission-error',
                new FirestorePermissionError({
                    path: newDocRef.path,
                    operation: 'create',
                    requestResourceData: dataWithId,
                })
            );
        });
}

export function updateWorker(db: Firestore, workerId: string, updates: Partial<Professional>) {
    const docRef = doc(db, 'workers', workerId);
    updateDocumentNonBlocking(docRef, updates);
}

export function deleteWorker(db: Firestore, workerId: string) {
    const docRef = doc(db, 'workers', workerId);
    deleteDoc(docRef).catch(error => {
        errorEmitter.emit(
            'permission-error',
            new FirestorePermissionError({
                path: docRef.path,
                operation: 'delete',
            })
        );
    });
}

export function toggleWorkerFeatured(db: Firestore, workerId: string, value: boolean) {
    const docRef = doc(db, 'workers', workerId);
    updateDocumentNonBlocking(docRef, { featured: value });
}

export function toggleWorkerVerified(db: Firestore, workerId: string, value: boolean) {
    const docRef = doc(db, 'workers', workerId);
    updateDocumentNonBlocking(docRef, { verified: value });
}

    
