import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

const BeeHeroIcon = new Icon({
  iconUrl: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png',
  iconSize: [35, 35], // size of the icon
})

function MapPage() {
  const navigate = useNavigate()
  const { lat, lng } = useParams()

  if (!lat || !lng) {
    navigate('/')

    return null
  }

  const latNumber = parseInt(lat)
  const lngNumber = parseInt(lng)

  return (
    <MapContainer center={[latNumber, lngNumber]} zoom={3} style={{ height: '100dvh', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[latNumber, lngNumber]} icon={BeeHeroIcon}></Marker>
    </MapContainer>
  )
}

export default MapPage
