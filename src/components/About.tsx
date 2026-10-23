import { Droplets, GraduationCap, PartyPopper, Trees, UtensilsCrossed, WavesLadder } from 'lucide-react'
import { Photo } from './Photo'

const highlights = [
  { icon: WavesLadder, label: 'Piscinas para adultos y niños' },
  { icon: Droplets, label: 'Toboganes, cascadas y puentes' },
  { icon: Trees, label: 'Áreas verdes y juegos infantiles' },
  { icon: UtensilsCrossed, label: 'Restaurante dentro del centro' },
  { icon: GraduationCap, label: 'Academia de natación' },
  { icon: PartyPopper, label: 'Salón para eventos' },
]

export function About() {
  return (
    <section aria-labelledby="sobre-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow text-lagoon-500">Sobre Leke's</p>
          <h2 id="sobre-title" className="mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl">
            Agua fresca, sombra de árboles y espacio para que <em className="text-lagoon-700">todos</em> la
            pasen bien.
          </h2>
          <div className="text-ink/75 mt-7 max-w-xl space-y-4 text-lg leading-relaxed">
            <p>
              Leke's es un centro recreativo familiar en el Barrio San Luis de Aguas Calientes de
              Siguatepeque. Sus piscinas, con figuras de delfines, puentes de madera y toboganes, están
              rodeadas de palmeras, jardines con flores de colores y kioscos con mesas para compartir.
            </p>
            <p>
              Es el tipo de lugar al que se viene a pasar el día completo: los niños entre el agua y los
              juegos, los adultos descansando al sol, y la comida a unos pasos en el restaurante.
            </p>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem]" data-reveal>
              <Photo id="kioscos-flores" sizes="(min-width: 1024px) 30vw, 60vw" />
            </div>
            <div
              className="col-span-2 mt-16 aspect-[3/5] overflow-hidden rounded-[2rem]"
              data-reveal
              style={{ ['--reveal-delay' as string]: '120ms' }}
            >
              <Photo id="jardin-arcos" sizes="(min-width: 1024px) 20vw, 40vw" compact />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="bg-foam absolute -top-10 -left-10 -z-10 h-56 w-56 rounded-full blur-2xl"
          />
        </div>
      </div>

      <ul className="container-x border-ink/10 mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t pt-10 sm:grid-cols-3 lg:grid-cols-6">
        {highlights.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
            className="flex flex-col gap-3"
          >
            <Icon className="text-lagoon-500 h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            <span className="text-sm leading-snug font-semibold">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
