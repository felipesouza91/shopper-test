import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { estimateRide } from '../services/ride.service';

const rideSchema = yup.object({
  customer_id: yup.string().required("Identificação do usuario é obrigatorio"),
  origin: yup.string().required("Origin é obrigatorio"),
  destination: yup.string().required("Destino é obrigatorio")
})

type RideSchemaInput = yup.InferType<typeof rideSchema>


const EstimateRide: React.FC = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {errors }
  } = useForm<RideSchemaInput>({
    resolver: yupResolver(rideSchema)
  })
  const navigate = useNavigate();

  const estimateRideHandle = async (data: RideSchemaInput) => {
    try {
      setLoading(true)
      const response = await estimateRide(data)
      if (response.status === 200) {
        setLoading(false)
        navigate("/confirm-ride", {
          state: {
            customerId: data.customer_id,
            destinationInitial: data.destination,
            originInitial: data.origin,
            ...response.data
          }
        })
      }
    } catch (error: any) {
      if (error.response?.data.error_description) {
        toast.current.show({severity:'warn', summary: 'Error', detail: error.response?.data.error_description, life: 3000})
      } else {
        toast.current.show({severity:'warn', summary: 'Error', detail: "Error, tente novamente mais tarde", life: 3000})
      }
      setLoading(false)
    }
    
  }

  return (
    <div className='w-10 mx-auto flex gap-3 flex-column'>
      <form className='formgrid ' onSubmit={handleSubmit(estimateRideHandle)}>
        <div className='field col'>
          <label>Identificação de Usuário</label>
          <InputText className='w-full' {...register('customer_id')} />
          { errors.customer_id  && <Message className=" mt-2" severity="error" text={errors.customer_id.message} /> }
        </div>
        <div className='field col'>
          <label>Endereço de Origin</label>
          <InputText className='w-full' {...register('origin')} />
          { errors.origin  && <Message className=" mt-2" severity="error" text={errors.origin.message} /> }
        </div>
        <div className='field col'>
          <label>Endereço de Destino</label>
          <InputText className='w-full' {...register('destination')} />
          { errors.destination  && <Message className=" mt-2" severity="error" text={errors.destination.message} /> }
        </div>
        <div className='col-12'>
          <Button loading={loading} type="submit" >Estimar corrida</Button>
        </div>
      </form>
      <div className='col'>
        <Link to="/history">
          <Button severity="secondary">Pesquisar Historico de Registro</Button>
        </Link>
      </div>
      <Toast ref={toast} />

    </div>
  );
}

export default EstimateRide;