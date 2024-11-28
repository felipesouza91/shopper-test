import { yupResolver } from "@hookform/resolvers/yup";
import { format, intervalToDuration } from "date-fns";
import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { findAllDriver } from "../services/driver.service";
import { searchDriverByCustomerId } from '../services/ride.service';

const searchSchema = yup.object({
  customer_id: yup.string().required("Identificador do usuario é obrigatorio"),
})

type SearchSchemaType = yup.InferType<typeof searchSchema>

const RideHistory: React.FC = () => {
  const toast = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState(undefined)
  const [driverOptions, setDriverOptions ]= useState(undefined)
  const { state: data } = useLocation();
  const [rides, setRides] = useState([])
  const {
    register,
    handleSubmit,
    formState: {errors }
  } = useForm<SearchSchemaType>({
    resolver: yupResolver(searchSchema)
  })


  const handleSearch = async (data: SearchSchemaType) => {
    await loadData(data.customer_id, selectedFilter )
  }

  const loadData = async (customerId: string, driver_id?: number) => {
    try {
      const { data } = await searchDriverByCustomerId(customerId, driver_id)
      const formattedData = data.rides.map(ride => {
        
        const{ minutes, seconds } = intervalToDuration({start: 0, end: ride.duration * 1000})
        return {
          ...ride,
          date: format(ride.date, 'dd/MM/yyyy mm:ss'),
          distance: `${ride.distance} metros`,
          value: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ride.value),
          duration: `${minutes}:${seconds}`
        }
      })
      setRides(formattedData)
    } catch (error: any) {
      if (error.response?.data.error_description) {
        toast.current.show({severity:'warn', summary: 'Error', detail: error.response?.data.error_description, life: 3000})
      } else {
      
        toast.current.show({severity:'warn', summary: 'Error', detail: "Error, tente novamente mais tarde", life: 3000})
      }
      setRides([])
    }
    
  }

  const loadDrivers = async () => {
    const response = await findAllDriver()
    const selectedFilter = response.data.map(driver => {
      return {
        value: driver.id,
        label: driver.name,
        title: driver.name
      }
    })
    setDriverOptions(selectedFilter)
  }

  useEffect(() => {
    loadDrivers()
    if (data && data.customerId) {
      loadData(data.customerId)
    }
  }, [])

  return (
    <div className='w-10 mx-auto flex gap-3 flex-column justify-content-center' >
      <form className='formgrid grid' onSubmit={handleSubmit(handleSearch)}>
        <div className='field col'>
          <label>Filtro</label>
          <InputText className='w-full' {...register('customer_id')} />
          { errors.customer_id  && <Message className=" mt-2" severity="error" text={errors.customer_id.message} /> }
        </div>
        <div className='field col-4'>
          <label>Filtro</label>
          <Dropdown 
            value={selectedFilter}
            options={driverOptions}
            onChange={(e) => setSelectedFilter(e.value)}
            placeholder="Selecione um filtro"
            className='w-full'/>
        </div>
        <div className='col-12'>
          <Button type="submit">Pesquisar</Button>
        </div>
      </form>

      <DataTable emptyMessage="Nenhuma corrida encontrada" 
        value={rides} tableStyle={{ minWidth: '50rem' }}
          paginator rows={5}>
        <Column field="date" header="Data/Hora Viagem" className='w-2' />
        <Column field="driver.name" header="Nome motorista"  />
        <Column field="origin" header="Origem" />
        <Column field="destination" header="Destino"  />
        <Column field="distance" header="Distancia"  />
        <Column field="duration" header="Tempo"  />
        <Column field="value" header="Valor"  />
       
      </DataTable>
      <div className='col mt-4'>
        <Link to="/">
          <Button severity="secondary">Estimar nova Corrida</Button>
        </Link>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default RideHistory;