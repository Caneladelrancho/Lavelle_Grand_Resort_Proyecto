import { RoomSearchComponent } from "./RoomSearchComponent";
import { CategoriesComponent } from "./CategoriesComponent";
import '../../styles/User/main.css'

export const MainComponent = () => {

  /*const categoriesList = [

    {
      id: 1,
      name: "Spa", 
      image: "/img/spa_6.jpg",
      gallery: ["/img/spa_3.jpg", "/img/spa_4.jpg", "/img/spa_5.jpg", "/img/spa_2.jpg", "/img/spa_8.jpg"], 
      description: "Sumérgete en una experiencia de relajación absoluta. Nuestro exclusivo spa ofrece masajes personalizados, tratamientos rejuvenecedores y rituales de bienestar inspirados en técnicas ancestrales. Ideal para renovar cuerpo, mente y espíritu en un entorno de lujo total."
    },
    { id: 2,
      name: "Experiencias gastronómicas",
      image: "/img/Rest_1.JPG",
      gallery: ["/img/Rest_2.JPG", "/img/Rest_3.JPG", "/img/Rest_4.jpg", "/img/Rest_5.jpg", "/img/Rest_6.jpg"],
      description: "Sabores exquisitos en escenarios memorables. Disfruta de restaurantes gourmet con menús creados por chefs internacionales, desde cocina fusión hasta platos típicos reinterpretados con elegancia para deleitar tus sentidos"
    },
    { id: 3,
      name: "Bar",
      image: "/img/Bar_5.jpeg",
      gallery: ["/img/Bar_1.jpg", "/img/Bar_2.JPG", "/img/Bar_3.jpg", "/img/Bar_4.jpg", "/img/Bar_6.jpg"],
      description: "Ambientes refinados para compartir momentos especiales. Ofrecemos una cuidada carta de vinos, licores premium y cócteles artesanales, todo en espacios con diseño exclusivo y atmósferas envolventes."
    },
    { id: 4,
      name: "Aventura y naturaleza",
      image: ,
      gallery: [],
      description: "Explora lo mejor de la naturaleza dentro y fuera del mar. Disfruta de caminatas ecológicas, cabalgatas al atardecer, paseos en yate, tours en veleros y deportes acuáticos. Vive la aventura con el equilibrio perfecto entre emoción y paisajes espectaculares."
    },
    { id: 5,
      name: "Suite",
      image: ,
      gallery: [],
      description: "Elegancia y distinción en cada detalle. Las suites combinan diseño contemporáneo con un ambiente acogedor, ofreciendo sala de estar independiente, baño de mármol con jacuzzi y una vista impresionante al mar. Ideal para quienes desean disfrutar del lujo con un toque de intimidad y sofisticación."
    },
    { id: 6,
      name: "Gimnasio",
      image: ,
      gallery: [],
      description: "Mantén tu estilo de vida activo con acceso a un gimnasio de última tecnología. Equipos modernos, clases dirigidas y espacios luminosos para entrenar con comodidad y vista privilegiada."
    },
    { id: 7,
      name: "Habitación Deluxe",
      image: ,
      gallery: [],
      description: "Confort refinado y estilo moderno. La habitación Deluxe destaca por su amplitud, su cama king size, su decoración con acabados de alta gama y sus vistas encantadoras. Un espacio pensado para el descanso profundo y la experiencia sensorial de un alojamiento de primera clase."
    },
    { id: 8,
      name: "Villas privadas",
      image: ,
      gallery: [],
      description: "Vive la máxima expresión del lujo y la privacidad. Nuestras villas ofrecen un refugio exclusivo con piscina privada, acceso directo a la playa y amplios espacios diseñados para el descanso total. Cada detalle ha sido cuidadosamente pensado para brindar una experiencia única, rodeada de confort y serenidad absoluta."
    },
    { id: 9,
      name: "Eventos y bodas",
      image: ,
      gallery: [],
      description: "Celebra tu gran día en un entorno de ensueño, donde cada detalle refleja elegancia y distinción. Desde ceremonias íntimas frente al mar hasta recepciones majestuosas en salones decorados con fineza, nuestro equipo experto convierte tu historia en una experiencia mágica e inolvidable."
    },    
    { id: 10,
      name: "Actividades acuáticas",
      image: ,
      gallery: [],
      description: "Sumérgete en la esencia del mar con experiencias diseñadas para despertar tus sentidos. Disfruta de paseos en yate, recorridos en lancha, snorkel entre aguas cristalinas o relajantes paseos en paddle board. Cada actividad combina aventura, elegancia y la serenidad del océano que rodea Lavelle Grand Resort."
    },
    { id: 11,
      name: "Piscinas",
      image: ,
      gallery: [],
      description: "Refresca cuerpo y alma en nuestras exclusivas piscinas, rodeadas de jardines tropicales y un ambiente de tranquilidad absoluta. Ya sea tomando el sol en una cama balinesa o disfrutando de un cóctel en el bar acuático, cada momento junto al agua se convierte en una experiencia de descanso y placer incomparable."
    },
    
    { id: 12,
      name: "Habitación Premium",
      image: ,
      gallery: [],
      description: "Sencillamente elegante. La habitación Premium ofrece un equilibrio perfecto entre comodidad, diseño y funcionalidad. Con mobiliario de lujo, iluminación suave y amenities exclusivos, es el lugar ideal para disfrutar de una estancia relajante con el sello distintivo de Lavelle Grand Resort."
    },    
    
  ]*/


  return (
    <main className="main-container">

        <section className="main-image">
            <div className="background-image"></div>
        </section>

        <section className="room-search-compt">
            <RoomSearchComponent/>
        </section>

        <section>
            <CategoriesComponent/>

        </section>

        <section>

        </section>

    </main>
  )

  
}
