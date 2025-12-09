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
import { PROFESSIONALS } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';

export default function AdminWorkersPage() {
  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Workers</h1>
          <p className="text-gray-600">Add, edit, or remove workers from your platform.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Worker
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>All Workers</CardTitle>
          <CardDescription>A list of all professionals on Local Pro.</CardDescription>
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
              {PROFESSIONALS.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${worker.id}`} />
                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {worker.name}
                  </TableCell>
                  <TableCell>{worker.specialization}</TableCell>
                   <TableCell>{worker.location}</TableCell>
                   <TableCell>{worker.rating.toFixed(1)}</TableCell>
                   <TableCell><Badge variant="outline">Active</Badge></TableCell>
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
                        <DropdownMenuItem>Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
