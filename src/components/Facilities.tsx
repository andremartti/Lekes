import { ArrowUpRight } from 'lucide-react'
import { whatsappLink } from '../config/site'
import { Photo } from './Photo'

const dishes = ['Parrillada familiar', 'Carnitas mixtas', 'Pollo con tajadas']

export function Facilities() {
  return (
    <section id="instalaciones" aria-labelledby="inst-title" className="bg-foam py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow text-lagoon-500">Instalaciones</p>
            <h2 id="inst-title" className="mt-4 max-w-2xl text-4xl leading-[1.05] font-medium sm:text-5xl">
              Un lugar pensado para pasar el día completo.
            </h2>
          </div>
          <a
            href={whatsappLink('instalaciones')}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-lagoon-700 inline-flex items-center gap-1.5 self-start pb-1 font-bold md:self-auto"
          >
            Preguntar por las instalaciones
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* 01 · Piscinas */}
          <article
            data-reveal
            className="group relative min-h-[26rem] overflow-hidden rounded-[2rem] text-white lg:col-span-7 lg:row-span-2 lg:min-h-[38rem]"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Photo id="piscina-ninos" sizes="(min-width: 1024px) 58vw, 100vw" compact />
            </div>
            <div className="from-ink/85 via-ink/20 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <span className="font-display text-sun-300 text-sm italic">01</span>
              <h3 className="mt-2 text-3xl font-medium sm:text-4xl">Piscinas para todas las edades</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/85">
                Varias piscinas para adultos y para niños, para que cada quien nade a su ritmo y los más
                pequeños jueguen con tranquilidad.
              </p>
            </div>
          </article>

          {/* 02 · Toboganes */}
          <article
            data-reveal
            style={{ ['--reveal-delay' as string]: '100ms' }}
            className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            <div className="group aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[16/10]">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <Photo id="toboganes" sizes="(min-width: 1024px) 40vw, 50vw" />
              </div>
            </div>
            <div className="px-1">
              <span className="font-display text-lagoon-500 text-sm italic">02</span>
              <h3 className="mt-2 text-2xl font-medium sm:text-3xl">Toboganes, delfines y cascadas</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">
                Las piscinas están decoradas con figuras de delfines, pequeñas cascadas y puentes. Los
                toboganes son la parada obligada de los niños.
              </p>
            </div>
          </article>

          {/* 03 · Jardines y juegos */}
          <article
            data-reveal
            style={{ ['--reveal-delay' as string]: '160ms' }}
            className="bg-leaf flex flex-col justify-between gap-6 rounded-[2rem] p-7 text-white sm:flex-row sm:items-center lg:col-span-5"
          >
            <div>
              <span className="font-display text-sun-300 text-sm italic">03</span>
              <h3 className="mt-2 text-2xl font-medium">Jardines, juegos y descanso</h3>
              <p className="mt-2 leading-relaxed text-white/85">
                Árboles, flores de colores, juegos infantiles y un área de descanso para tomar el sol.
              </p>
            </div>
            <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-32">
              <Photo id="juegos" compact sizes="128px" />
            </div>
          </article>
        </div>

        {/* 04 · Restaurante */}
        <article
          data-reveal
          className="mt-5 grid overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-40px_rgba(12,40,48,0.4)] md:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="font-display text-hibiscus text-sm italic">04</span>
            <h3 className="mt-2 text-3xl font-medium sm:text-4xl">Restaurante para recargar energía</h3>
            <p className="text-ink/70 mt-4 leading-relaxed">
              Después de la piscina, el hambre llega. En Leke's hay restaurante, así que no hace falta salir
              para comer bien.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {dishes.map((d) => (
                <li key={d} className="border-ink/15 rounded-full border px-4 py-2 text-sm font-semibold">
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-ink/55 mt-4 text-sm">
              Platillos mencionados en guías turísticas. Consulta el menú vigente.
            </p>
            <a
              href={whatsappLink('restaurante')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-8 self-start"
            >
              Preguntar por el menú
            </a>
          </div>
          <div className="group min-h-72 overflow-hidden">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <Photo id="restaurante" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
