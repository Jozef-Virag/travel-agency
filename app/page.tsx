"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, ExternalLink, TrendingDown, SlidersHorizontal, Users, Bed, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const mockOffers = [
  {
    id: 1,
    hotelName: "Grand Plaza Hotel",
    roomType: "Deluxe Suite",
    partner: "Booking.com",
    nettoPrice: 189.99,
    availability: true,
    link: "https://booking.com/placeholder",
    location: "New York, USA",
    rating: 8.9,
    reviewCount: 2847,
    image: "/luxury-hotel-deluxe-suite-interior.jpg",
    amenities: ["Free WiFi", "Breakfast included", "Pool"],
    beds: 1,
    guests: 2,
  },
  {
    id: 2,
    hotelName: "Grand Plaza Hotel",
    roomType: "Standard Room",
    partner: "Expedia",
    nettoPrice: 129.99,
    availability: true,
    link: "https://expedia.com/placeholder",
    location: "New York, USA",
    rating: 8.9,
    reviewCount: 2847,
    image: "/modern-hotel-standard-room.jpg",
    amenities: ["Free WiFi", "Breakfast included"],
    beds: 1,
    guests: 2,
  },
  {
    id: 3,
    hotelName: "Grand Plaza Hotel",
    roomType: "Deluxe Suite",
    partner: "Hotels.com",
    nettoPrice: 199.99,
    availability: true,
    link: "https://hotels.com/placeholder",
    location: "New York, USA",
    rating: 8.9,
    reviewCount: 2847,
    image: "/luxury-hotel-deluxe-suite-interior.jpg",
    amenities: ["Free WiFi", "Breakfast included", "Pool"],
    beds: 1,
    guests: 2,
  },
  {
    id: 4,
    hotelName: "Grand Plaza Hotel",
    roomType: "Standard Room",
    partner: "Agoda",
    nettoPrice: 119.99,
    availability: false,
    link: "https://agoda.com/placeholder",
    location: "New York, USA",
    rating: 8.9,
    reviewCount: 2847,
    image: "/modern-hotel-standard-room.jpg",
    amenities: ["Free WiFi", "Breakfast included"],
    beds: 1,
    guests: 2,
  },
  {
    id: 5,
    hotelName: "Seaside Resort",
    roomType: "Ocean View Suite",
    partner: "Booking.com",
    nettoPrice: 299.99,
    availability: true,
    link: "https://booking.com/placeholder",
    location: "Miami Beach, USA",
    rating: 9.2,
    reviewCount: 1542,
    image: "/beach-resort-ocean-view-balcony.jpg",
    amenities: ["Free WiFi", "Beach access", "Spa", "Pool"],
    beds: 1,
    guests: 3,
  },
  {
    id: 6,
    hotelName: "Seaside Resort",
    roomType: "Ocean View Suite",
    partner: "Trivago",
    nettoPrice: 279.99,
    availability: true,
    link: "https://trivago.com/placeholder",
    location: "Miami Beach, USA",
    rating: 9.2,
    reviewCount: 1542,
    image: "/beach-resort-ocean-view-balcony.jpg",
    amenities: ["Free WiFi", "Beach access", "Spa", "Pool"],
    beds: 1,
    guests: 3,
  },
  {
    id: 7,
    hotelName: "Seaside Resort",
    roomType: "Standard Room",
    partner: "Expedia",
    nettoPrice: 159.99,
    availability: true,
    link: "https://expedia.com/placeholder",
    location: "Miami Beach, USA",
    rating: 9.2,
    reviewCount: 1542,
    image: "/beach-resort-room-tropical.jpg",
    amenities: ["Free WiFi", "Beach access"],
    beds: 2,
    guests: 2,
  },
  {
    id: 8,
    hotelName: "Seaside Resort",
    roomType: "Standard Room",
    partner: "Hotels.com",
    nettoPrice: 169.99,
    availability: true,
    link: "https://hotels.com/placeholder",
    location: "Miami Beach, USA",
    rating: 9.2,
    reviewCount: 1542,
    image: "/beach-resort-room-tropical.jpg",
    amenities: ["Free WiFi", "Beach access"],
    beds: 2,
    guests: 2,
  },
  {
    id: 9,
    hotelName: "City Center Inn",
    roomType: "Business Suite",
    partner: "Agoda",
    nettoPrice: 249.99,
    availability: true,
    link: "https://agoda.com/placeholder",
    location: "London, UK",
    rating: 8.5,
    reviewCount: 3124,
    image: "/business-hotel-suite-city-skyline.jpg",
    amenities: ["Free WiFi", "Business center", "Gym"],
    beds: 1,
    guests: 2,
  },
  {
    id: 10,
    hotelName: "City Center Inn",
    roomType: "Standard Room",
    partner: "Booking.com",
    nettoPrice: 149.99,
    availability: true,
    link: "https://booking.com/placeholder",
    location: "London, UK",
    rating: 8.5,
    reviewCount: 3124,
    image: "/modern-city-hotel-room.jpg",
    amenities: ["Free WiFi", "Business center"],
    beds: 1,
    guests: 2,
  },
  {
    id: 11,
    hotelName: "City Center Inn",
    roomType: "Business Suite",
    partner: "Trivago",
    nettoPrice: 239.99,
    availability: false,
    link: "https://trivago.com/placeholder",
    location: "London, UK",
    rating: 8.5,
    reviewCount: 3124,
    image: "/business-hotel-suite-city-skyline.jpg",
    amenities: ["Free WiFi", "Business center", "Gym"],
    beds: 1,
    guests: 2,
  },
  {
    id: 12,
    hotelName: "Mountain View Lodge",
    roomType: "Apartment",
    partner: "Expedia",
    nettoPrice: 199.99,
    availability: true,
    link: "https://expedia.com/placeholder",
    location: "Aspen, USA",
    rating: 9.5,
    reviewCount: 876,
    image: "/mountain-lodge-apartment-cozy.jpg",
    amenities: ["Free WiFi", "Kitchenette", "Fireplace", "Ski storage"],
    beds: 2,
    guests: 4,
  },
  {
    id: 13,
    hotelName: "Mountain View Lodge",
    roomType: "Deluxe Suite",
    partner: "Hotels.com",
    nettoPrice: 229.99,
    availability: true,
    link: "https://hotels.com/placeholder",
    location: "Aspen, USA",
    rating: 9.5,
    reviewCount: 876,
    image: "/mountain-lodge-suite-panoramic-view.jpg",
    amenities: ["Free WiFi", "Mountain view", "Fireplace"],
    beds: 1,
    guests: 2,
  },
  {
    id: 14,
    hotelName: "Mountain View Lodge",
    roomType: "Apartment",
    partner: "Booking.com",
    nettoPrice: 189.99,
    availability: true,
    link: "https://booking.com/placeholder",
    location: "Aspen, USA",
    rating: 9.5,
    reviewCount: 876,
    image: "/mountain-lodge-apartment-cozy.jpg",
    amenities: ["Free WiFi", "Kitchenette", "Fireplace", "Ski storage"],
    beds: 2,
    guests: 4,
  },
  {
    id: 15,
    hotelName: "Mountain View Lodge",
    roomType: "Standard Room",
    partner: "Agoda",
    nettoPrice: 139.99,
    availability: true,
    link: "https://agoda.com/placeholder",
    location: "Aspen, USA",
    rating: 9.5,
    reviewCount: 876,
    image: "/cozy-mountain-hotel-room.jpg",
    amenities: ["Free WiFi", "Mountain view"],
    beds: 1,
    guests: 2,
  },
  {
    id: 16,
    hotelName: "Lakeside Retreat",
    roomType: "Lakefront Suite",
    partner: "Trivago",
    nettoPrice: 319.99,
    availability: true,
    link: "https://trivago.com/placeholder",
    location: "Lake Como, Italy",
    rating: 9.7,
    reviewCount: 654,
    image: "/luxury-lakefront-suite-balcony-view.jpg",
    amenities: ["Free WiFi", "Lake view", "Private balcony", "Spa"],
    beds: 1,
    guests: 2,
  },
  {
    id: 17,
    hotelName: "Lakeside Retreat",
    roomType: "Lakefront Suite",
    partner: "Booking.com",
    nettoPrice: 329.99,
    availability: true,
    link: "https://booking.com/placeholder",
    location: "Lake Como, Italy",
    rating: 9.7,
    reviewCount: 654,
    image: "/luxury-lakefront-suite-balcony-view.jpg",
    amenities: ["Free WiFi", "Lake view", "Private balcony", "Spa"],
    beds: 1,
    guests: 2,
  },
  {
    id: 18,
    hotelName: "Lakeside Retreat",
    roomType: "Standard Room",
    partner: "Expedia",
    nettoPrice: 179.99,
    availability: false,
    link: "https://expedia.com/placeholder",
    location: "Lake Como, Italy",
    rating: 9.7,
    reviewCount: 654,
    image: "/elegant-lake-view-room.jpg",
    amenities: ["Free WiFi", "Lake view"],
    beds: 2,
    guests: 2,
  },
  {
    id: 19,
    hotelName: "Lakeside Retreat",
    roomType: "Deluxe Suite",
    partner: "Hotels.com",
    nettoPrice: 259.99,
    availability: true,
    link: "https://hotels.com/placeholder",
    location: "Lake Como, Italy",
    rating: 9.7,
    reviewCount: 654,
    image: "/elegant-suite-lake-view-balcony.jpg",
    amenities: ["Free WiFi", "Lake view", "Private balcony"],
    beds: 1,
    guests: 2,
  },
  {
    id: 20,
    hotelName: "Lakeside Retreat",
    roomType: "Standard Room",
    partner: "Agoda",
    nettoPrice: 169.99,
    availability: true,
    link: "https://agoda.com/placeholder",
    location: "Lake Como, Italy",
    rating: 9.7,
    reviewCount: 654,
    image: "/elegant-lake-view-room.jpg",
    amenities: ["Free WiFi", "Lake view"],
    beds: 2,
    guests: 2,
  },
]

const partnerColors: Record<string, { bg: string; text: string; border: string }> = {
  "Booking.com": { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
  Expedia: { bg: "bg-yellow-500", text: "text-gray-900", border: "border-yellow-500" },
  "Hotels.com": { bg: "bg-red-500", text: "text-white", border: "border-red-500" },
  Agoda: { bg: "bg-purple-500", text: "text-white", border: "border-purple-500" },
  Trivago: { bg: "bg-orange-500", text: "text-white", border: "border-orange-500" },
}

export default function TravelDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPartner, setSelectedPartner] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedRoomType, setSelectedRoomType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("price-low")
  const [priceRange, setPriceRange] = useState<number[]>([0, 500])
  const [minRating, setMinRating] = useState<number>(0)
  const [showFilters, setShowFilters] = useState(false)

  const locations = useMemo(() => {
    return ["all", ...Array.from(new Set(mockOffers.map((offer) => offer.location)))]
  }, [])

  const partners = useMemo(() => {
    return ["all", ...Array.from(new Set(mockOffers.map((offer) => offer.partner)))]
  }, [])

  const roomTypes = useMemo(() => {
    return ["all", ...Array.from(new Set(mockOffers.map((offer) => offer.roomType)))]
  }, [])

  const filteredOffers = useMemo(() => {
    return mockOffers.filter((offer) => {
      if (!offer.availability) return false

      const matchesSearch =
        searchQuery === "" ||
        offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPartner = selectedPartner === "all" || offer.partner === selectedPartner

      const matchesLocation = selectedLocation === "all" || offer.location === selectedLocation

      const matchesRoomType = selectedRoomType === "all" || offer.roomType === selectedRoomType

      const matchesPrice = offer.nettoPrice >= priceRange[0] && offer.nettoPrice <= priceRange[1]

      const matchesRating = offer.rating >= minRating

      return matchesSearch && matchesPartner && matchesLocation && matchesRoomType && matchesPrice && matchesRating
    })
  }, [searchQuery, selectedPartner, selectedLocation, selectedRoomType, priceRange, minRating])

  const groupedOffers = useMemo(() => {
    const groups = new Map<string, typeof mockOffers>()

    filteredOffers.forEach((offer) => {
      const key = offer.hotelName
      if (!groups.has(key)) {
        groups.set(key, [])
      }
      groups.get(key)!.push(offer)
    })

    return Array.from(groups.entries())
      .map(([hotelName, offers]) => ({
        hotelName,
        offers: offers.sort((a, b) => a.nettoPrice - b.nettoPrice),
        minPrice: Math.min(...offers.map((o) => o.nettoPrice)),
        location: offers[0].location,
        rating: offers[0].rating,
        reviewCount: offers[0].reviewCount,
        image: offers[0].image,
      }))
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.minPrice - b.minPrice
          case "price-high":
            return b.minPrice - a.minPrice
          case "rating":
            return b.rating - a.rating
          case "reviews":
            return b.reviewCount - a.reviewCount
          case "name":
            return a.hotelName.localeCompare(b.hotelName)
          default:
            return 0
        }
      })
  }, [filteredOffers, sortBy])

  const cheapestOffers = useMemo(() => {
    const cheapestMap = new Map<string, number>()

    filteredOffers.forEach((offer) => {
      const key = `${offer.hotelName}-${offer.roomType}`
      const currentCheapest = cheapestMap.get(key)

      if (!currentCheapest || offer.nettoPrice < currentCheapest) {
        cheapestMap.set(key, offer.nettoPrice)
      }
    })

    return cheapestMap
  }, [filteredOffers])

  const isCheapest = (offer: (typeof mockOffers)[0]) => {
    const key = `${offer.hotelName}-${offer.roomType}`
    return cheapestOffers.get(key) === offer.nettoPrice
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gray-100 text-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Find your next stay</h1>
          <p className="text-lg text-gray-700">Compare offers from top booking partners</p>

          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <div className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600" />
                <Input
                  placeholder="Search by destination or property name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-white border-0"
                />
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-12 bg-white border-0">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.slice(1).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Filter by</h3>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Booking Partner</Label>
                  <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                    <SelectTrigger>
                      <SelectValue placeholder="All partners" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Partners</SelectItem>
                      {partners.slice(1).map((partner) => (
                        <SelectItem key={partner} value={partner}>
                          {partner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Room Type</Label>
                  <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All room types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Room Types</SelectItem>
                      {roomTypes.slice(1).map((roomType) => (
                        <SelectItem key={roomType} value={roomType}>
                          {roomType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Price per night: €{priceRange[0]} - €{priceRange[1]}
                  </Label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Minimum Review Score</Label>
                  <Select value={minRating.toString()} onValueChange={(val) => setMinRating(Number(val))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="7">7+ Good</SelectItem>
                      <SelectItem value="8">8+ Very Good</SelectItem>
                      <SelectItem value="9">9+ Superb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedPartner("all")
                    setSelectedLocation("all")
                    setSelectedRoomType("all")
                    setPriceRange([0, 500])
                    setMinRating(0)
                  }}
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{groupedOffers.length}</span> properties found
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Reviewed</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Property Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {groupedOffers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p className="text-lg">No properties found matching your criteria</p>
                  <p className="text-sm mt-2">Try adjusting your filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {groupedOffers.map((group) => (
                  <Card key={group.hotelName} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-[300px_1fr] gap-0">
                      <div className="relative h-[250px] md:h-auto">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.hotelName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardContent className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-1">{group.hotelName}</h2>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{group.location}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <p className="text-sm font-semibold">
                                    {group.rating >= 9 ? "Superb" : group.rating >= 8 ? "Very Good" : "Good"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {group.reviewCount.toLocaleString()} reviews
                                  </p>
                                </div>
                                <div className="bg-gray-800 text-white px-2 py-1 rounded-t-lg rounded-br-lg font-bold text-lg min-w-[44px] text-center">
                                  {group.rating.toFixed(1)}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mt-4">
                            {group.offers.map((offer) => (
                              <div
                                key={offer.id}
                                className={`border rounded-lg p-3 ${
                                  isCheapest(offer) ? "border-green-500 bg-green-50" : "border-border"
                                }`}
                              >
                                <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-center">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold">{offer.roomType}</h3>
                                      {isCheapest(offer) && (
                                        <Badge variant="default" className="bg-green-600 gap-1">
                                          <TrendingDown className="h-3 w-3" />
                                          Best Price
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {offer.guests} guests
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Bed className="h-4 w-4" />
                                        {offer.beds} bed{offer.beds > 1 ? "s" : ""}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {offer.amenities.map((amenity) => (
                                        <Badge key={amenity} variant="secondary" className="text-xs">
                                          {amenity}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Badge
                                      className={`mb-2 text-sm font-bold px-3 py-1.5 shadow-md hover:shadow-lg transition-shadow ${
                                        partnerColors[offer.partner]?.bg || "bg-gray-600"
                                      } ${partnerColors[offer.partner]?.text || "text-white"} border-2 ${
                                        partnerColors[offer.partner]?.border || "border-gray-600"
                                      }`}
                                    >
                                      {offer.partner}
                                    </Badge>
                                    <p className="text-2xl font-bold text-gray-900">€{offer.nettoPrice.toFixed(0)}</p>
                                    <p className="text-xs text-muted-foreground">per night</p>
                                  </div>
                                  <div>
                                    <Button asChild className="bg-gray-700 hover:bg-gray-800">
                                      <a href={offer.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                                        See availability
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
