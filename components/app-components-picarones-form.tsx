'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WhatsappIcon, PhoneIcon, MinusIcon, PlusIcon, MapPinIcon } from 'lucide-react'

export function AppComponentsPicaronesForm() {
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const pricePerPortion = 2.50
  const whatsappNumber = '902175677'
  const googleMapsLink = 'https://maps.app.goo.gl/HVuSNkJ1cEEUgWRw8'

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, quantity }),
    })
    if (response.ok) {
      setOrderPlaced(true)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-red-600 animate-pulse">
        Picarones Estela
      </h1>
      <p className="mt-2 text-gray-600">¡Los picarones más deliciosos de la ciudad!</p>
      
      <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-yellow-800 mb-2">Menú de Precios</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => handleQuantityChange(-1)}
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
            >
              <MinusIcon size={20} />
            </button>
            <span className="mx-4 text-2xl font-bold">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300"
            >
              <PlusIcon size={20} />
            </button>
          </div>
          <div className="text-2xl font-bold text-yellow-800">
            {(quantity * pricePerPortion).toFixed(2)} soles
          </div>
        </div>
        <p className="mt-2 text-sm text-yellow-700">Precio por porción: {pricePerPortion.toFixed(2)} soles</p>
      </div>
      
      {!orderPlaced ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Teléfono:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105">
            ¡Hacer Pedido!
          </button>
        </form>
      ) : (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <h3 className="font-bold text-xl mb-2">¡Gracias por tu pedido!</h3>
          <p>Tu pedido de {quantity} porciones por un total de {(quantity * pricePerPortion).toFixed(2)} soles ha sido recibido.</p>
          <div className="mt-4 flex flex-col space-y-2">
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
              <MapPinIcon className="mr-2" size={20} />
              Ver ubicación para recoger
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300">
              <WhatsappIcon className="mr-2" size={20} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}