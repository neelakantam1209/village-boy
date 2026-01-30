
'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { deleteWorker } from '@/services/workerService';
import { AddWorkerModal } from '@/components/admin/add-worker-modal';
import { getLocalImageByName } from '@/lib/image-utils';

export default function AdminWorkersPage() {
  const firestore = useFirestore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'workers'), orderBy('name'));
  }, [firestore]);

  const { data: workers, isLoading } = useCollection(workersQuery);

  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Workers</h1>
          <p className="text-gray-600">Add, edit, or remove workers from your platform.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Worker
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>All Workers</CardTitle>
          <CardDescription>A list of all professionals on Local Boy.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>}
              {workers && workers.map((worker) => {
                const imageSrc = getLocalImageByName(worker.image || worker.name);
                return (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={imageSrc} alt={worker.name} />
                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {worker.name}
                  </TableCell>
                  <TableCell>{worker.serviceName}</TableCell>
                   <TableCell>{worker.location}</TableCell>
                   <TableCell>{worker.rating.toFixed(1)}</TableCell>
                   <TableCell><Badge variant={worker.featured ? "default" : "outline"}>{worker.verified ? 'Verified' : 'Unverified'}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => firestore && deleteWorker(firestore, worker.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddWorkerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
