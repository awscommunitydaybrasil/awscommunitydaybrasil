import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import alceuNeto from "@/assets/img/team/alceu-neto.jpg";
import caioNunes from "@/assets/img/team/caio-nunes.jpg";
import rafaelaVidotti from "@/assets/img/team/rafaela-vidotti.jpg";
import thayanaMamore from "@/assets/img/team/thayana-mamore.png";
import wagnerLandim from "@/assets/img/team/wagner-landim.jpg";
import postcardBH from "@/assets/postcard-bh.png";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const stats = [
  { value: "5", label: "Edições regionais" },
  { value: "1.548", label: "Presenças registradas" },
  { value: "88", label: "Palestrantes" },
  { value: "117", label: "Voluntários e staff" },
];

const editions = [
  {
    name: "Centro-Oeste",
    city: "Brasília",
    state: "DF",
    date: "27 jun 2026",
    photoCaption: "Brasília · 27 de junho",
    photo: publicAsset("centro-oeste/resultado/event-photo.jpg"),
    photoAlt: "Participantes do AWS Community Day Centro-Oeste reunidos em Brasília",
    attendance: 204,
    ordinal: "01",
    route: "/centro-oeste/",
    organizer: "Wagner Landim",
    organizerRole: "Organizador",
    organizerPhoto: wagnerLandim,
    linkedin: "https://www.linkedin.com/in/wagnerlandim/",
  },
  {
    name: "Sudeste",
    city: "Belo Horizonte",
    state: "MG",
    date: "22 ago 2026",
    photoCaption: "Belo Horizonte · 22 de agosto",
    photo: postcardBH,
    photoAlt: "Imagem da edição Sudeste do AWS Community Day em Belo Horizonte",
    attendance: 200,
    ordinal: "02",
    route: "/sudeste/",
    organizer: "Rafaela Vidotti",
    organizerRole: "Organizadora",
    organizerPhoto: rafaelaVidotti,
    linkedin: "https://www.linkedin.com/in/rafaelavidotti/",
  },
  {
    name: "Sul",
    city: "Curitiba",
    state: "PR",
    date: "19 set 2026",
    photoCaption: "Curitiba · 19 de setembro",
    photo: publicAsset("sul/resultado/event-photo.jpg"),
    photoAlt: "Participantes do AWS Community Day Sul reunidos em Curitiba",
    attendance: 161,
    ordinal: "03",
    route: "/sul/",
    organizer: "Alceu Neto",
    organizerRole: "Organizador",
    organizerPhoto: alceuNeto,
    linkedin: "https://www.linkedin.com/in/alceu-conerado-neto-0b4b6334/",
  },
  {
    name: "Nordeste",
    city: "Salvador",
    state: "BA",
    date: "10 out 2026",
    photoCaption: "Salvador · 10 de outubro",
    photo: publicAsset("nordeste/resultado/event-photo.jpg"),
    photoAlt: "Público do AWS Community Day Nordeste reunido em Salvador",
    attendance: 629,
    ordinal: "04",
    route: "/nordeste/",
    organizer: "Caio Nunes",
    organizerRole: "Organizador",
    organizerPhoto: caioNunes,
    linkedin: "https://www.linkedin.com/in/caionscloud/",
  },
  {
    name: "Norte",
    city: "Belém",
    state: "PA",
    date: "31 out 2026",
    photoCaption: "Belém · 31 de outubro",
    photo: publicAsset("prototipo/retrospectiva-2026/assets/norte-event.jpg"),
    photoAlt: "Participantes do AWS Community Day Norte reunidos em Belém",
    attendance: 354,
    ordinal: "05",
    route: "/norte/",
    organizer: "Thayana Mamoré",
    organizerRole: "Organizadora",
    organizerPhoto: thayanaMamore,
    linkedin: "https://www.linkedin.com/in/thayanacmamore/",
  },
];

const SeasonRetrospective = () => (
  <>
    <section className="relative scroll-mt-20 overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="container grid items-center gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-primary lg:justify-start">
            <span className="h-0.5 w-5 bg-primary" />
            Temporada encerrada · 2026
          </p>
          <h1 className="mb-5 text-[clamp(2.2rem,11vw,4.2rem)] font-extrabold leading-[1.03] tracking-tight text-foreground sm:text-[clamp(2.8rem,6vw,5.2rem)]">
            Cinco regiões.
            <br />
            <span className="text-primary">Uma comunidade.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
            Uma temporada inteira de encontros, ideias e conexões. Relembre os momentos que aproximaram a comunidade AWS de todo o Brasil.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#edicoes"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-extrabold text-[#161b24] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Reviver a temporada <ArrowDown aria-hidden="true" size={16} />
            </a>
            <a
              href="#impacto"
              className="inline-flex min-h-12 items-center rounded-lg border border-border px-5 py-3 text-sm font-extrabold text-foreground transition hover:border-primary/60"
            >
              Ver o impacto
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <span className="absolute -left-2 top-0 z-10 -rotate-3 rounded-xl border border-primary/40 bg-card px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-primary sm:-left-4">
            Brasil · 2026
          </span>
          <div aria-hidden="true" className="absolute -bottom-8 right-0 -z-10 h-1/2 w-1/2 rounded-full border border-primary/20" />
          <figure className="relative aspect-[1.12] overflow-hidden rounded-3xl border border-white/15 bg-card shadow-2xl">
            <img
              src={publicAsset("nordeste/resultado/event-photo.jpg")}
              alt="Participantes reunidos no AWS Community Day Nordeste, em Salvador"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/90 to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5">
              <strong className="block font-display text-xl font-bold">Conhecimento que conecta</strong>
              <span className="text-sm text-secondary-foreground">Momentos vividos pela comunidade em 2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="impacto" aria-label="Impacto da temporada 2026" className="scroll-mt-24 pb-16 md:pb-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-28 flex-col items-center justify-center bg-card px-3 py-5 text-center md:min-h-32"
            >
              <strong className="font-display text-4xl font-extrabold leading-none text-primary md:text-5xl">{stat.value}</strong>
              <span className="mt-2 text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="edicoes" className="scroll-mt-20 bg-gradient-to-b from-secondary/50 to-transparent py-20 md:py-24">
      <div className="container">
        <div className="mx-auto mb-11 max-w-3xl text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Uma temporada, cinco encontros</p>
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">O Brasil se encontrou</h2>
          <p className="text-muted-foreground">Veja um pouco de cada edição e quantas pessoas estiveram presentes em cada região.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
          {editions.map((edition, index) => (
            <article
              key={edition.name}
              className={`group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl md:col-span-1 xl:col-span-4 ${index === 3 ? "xl:col-start-3" : ""} ${index === 4 ? "xl:col-start-7" : ""}`}
            >
              <Link to={edition.route} aria-label={`Conheça a edição ${edition.name} em ${edition.city}`} className="relative block h-52 overflow-hidden bg-secondary">
                <img
                  src={edition.photo}
                  alt={edition.photoAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/75 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold text-white">{edition.photoCaption}</span>
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-foreground">{edition.name}</h3>
                  <div className="shrink-0 text-right font-display text-2xl font-extrabold leading-none text-primary">
                    {edition.attendance}
                    <small className="mt-1 block font-body text-[0.65rem] font-semibold text-muted-foreground">participantes</small>
                  </div>
                </div>
                <p className="mb-4 mt-1 text-xs text-muted-foreground">{edition.city}, {edition.state} · {edition.date}</p>

                <a
                  href={edition.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Perfil de ${edition.organizer} no LinkedIn`}
                  className="mb-4 flex items-center gap-3 border-t border-border pt-4"
                >
                  <span className="relative h-12 w-12 shrink-0 rounded-full border-2 border-primary">
                    <img src={edition.organizerPhoto} alt="" loading="lazy" className="h-full w-full rounded-full object-cover" />
                    <span aria-hidden="true" className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[0.62rem] font-extrabold text-[#161b24]">in</span>
                  </span>
                  <span>
                    <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">{edition.organizerRole}</span>
                    <strong className="mt-0.5 block text-sm font-bold text-foreground">{edition.organizer}</strong>
                  </span>
                </a>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.68rem] text-muted-foreground">Edição {edition.ordinal} de 05</span>
                  <Link to={edition.route} className="inline-flex items-center gap-1 text-xs font-extrabold text-primary transition hover:text-foreground">
                    Conheça a edição <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="2027" className="scroll-mt-20 pb-20 pt-4 md:pb-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-card via-secondary to-card px-6 py-12 text-center md:px-12 md:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">A comunidade continua</p>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">Nos vemos na próxima temporada.</h2>
            <p className="mb-7 text-muted-foreground">
              Obrigado a quem participou, palestrou, organizou, patrocinou e fez cada encontro acontecer. Acompanhe os canais da comunidade para saber das novidades.
            </p>
            <a
              href="https://www.instagram.com/awscommunitybrasil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-extrabold text-[#161b24] transition hover:brightness-110"
            >
              Acompanhar a comunidade <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SeasonRetrospective;
