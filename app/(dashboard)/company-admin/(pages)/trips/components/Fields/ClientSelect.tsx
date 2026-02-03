import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateTripFormData } from '../CreateTrip/TripForm';

type Props = {
  formData: CreateTripFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTripFormData>>;
  clients: any;
  loadingClients: any;
};

export const ClientSelect = ({
  formData,
  setFormData,
  clients,
  loadingClients,
}: Props) => {
  return (
    <>
      <div>
        <Label htmlFor="client" className="text-gray-300 mb-2">
          Client
        </Label>

        <Select
          value={formData.clientId}
          onValueChange={(value) => {
            const selectedClient = clients.find(
              (d: { id: string }) => d.id === value
            );
            setFormData({
              ...formData,
              clientId: value,
              clientName: selectedClient ? selectedClient.name : '',
            });
          }}
        >
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue
              placeholder={
                loadingClients ? 'Loading clients...' : 'Select client'
              }
            />
          </SelectTrigger>

          <SelectContent className="bg-gray-700 border-gray-600">
            {loadingClients ? (
              <div className="p-2 text-gray-400 text-sm">
                Loading clients...
              </div>
            ) : clients.length === 0 ? (
              <div className="p-2 text-gray-400 text-sm">No clients found</div>
            ) : (
              clients.map((client: any) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="client" className="text-gray-300">
          Client Name
        </Label>
        <Input
          id="client"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
          placeholder="Enter client name"
          className="bg-gray-700 border-gray-600 text-white mt-2"
        />
      </div>
    </>
  );
};
