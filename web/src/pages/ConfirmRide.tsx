import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import React, { useRef, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmRide } from '../services/ride.service';

const ConfirmRide: React.FC = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const toast = useRef(null);
  const {distance, customerId, destinationInitial, originInitial, duration} = data;
  
  const handleConfirmRide = async (input) => {
    try {
      const confirmData = {
        customer_id: customerId,
        origin: originInitial,
        destination: destinationInitial,
        distance,
        duration,
        driver: {
          id: input.id,
          name: input.name
        },
        value: input.value
      }
      const response = await confirmRide(confirmData)
      toast.current.show({severity:'success', summary: 'Success', detail:'Corrida registrada com sucesso', life: 3000})
      if (response.status === 200 && response.data.success) {
        navigate(`/history`, {
          state: {
            customerId: customerId
          }
        })
      }
    } catch (error: any) {
      if (error.response?.data.error_description) {
        toast.current.show({severity:'warn', summary: 'Error', detail: error.response?.data.error_description, life: 3000})
      } else {
      
        toast.current.show({severity:'warn', summary: 'Error', detail: "Error, tente novamente mais tarde", life: 3000})
      }
    }
  }

  return (
    <div className='w-10 mx-auto flex gap-3 flex-column justify-content-center	'>
      <div className='w-full h-28rem'>
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={9}
          defaultCenter={{
            lat: data.origin.latitude,
            lng: data.origin.longitude
          }}
          gestureHandling={"greedy"}
          disableDefaultUI
          mapId='APP_ID'
        >
          <AdvancedMarker key={"origin"} position={{
            lat: data.origin.latitude,
            lng: data.origin.longitude
          }} />
          <AdvancedMarker key={"destination"} position={{
            lat: data.destination.latitude,
            lng: data.destination.longitude
          }} />
        </Map>
      </div>
      
      <DataTable emptyMessage="Nenhuma lista encontrada" 
        value={data.options} tableStyle={{ minWidth: '50rem' }}
          paginator rows={5}>
        <Column field="name" header="Nome" className='w-2'  />
        <Column field="description" header="Descrição"  />
        <Column field="vehicle" header="Veiculo" />
        <Column field="review" header="Avaliação" body={({review}) => (<span>{review.rating}/5</span>
          )} />
        <Column field="value" header="Valor da Corrida"  />
        <Column body={(value) => {
          return (
              <Button onClick={() => handleConfirmRide(value)}>Escolher</Button>
            )
        }}/>
      </DataTable>
      <Toast ref={toast} />
    </div>
  );
}

export default ConfirmRide;