import communityImg from "@/assets/community-illustration.png";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src={communityImg}
              alt="Somos uma Comunidade, Brasil!"
              className="w-full max-w-md rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">
              Sobre o AWS Community Day Brasil
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Os AWS Community Days são eventos organizados pelos grupos de usuários AWS
                do mundo inteiro, com o objetivo de proporcionar discussões e demonstrações de
                serviços AWS, lideradas por usuários e empresas que são referência no Brasil e no mundo.
              </p>
              <p>
                Acreditamos firmemente que aprender em comunidade é uma das melhores
                formas de se aprofundar em conceitos, se conectando a pessoas com um objetivo
                comum: aprender e compartilhar conhecimento de forma igualitária, segura, justa e acessível.
              </p>
              <p>
                Todas as pessoas são bem-vindas para colaborar e fazer parte desta jornada de
                conhecimento e compartilhamento. As atividades do AWS Community Day Brasil
                são guiadas pelo{" "}
                <a
                  href="https://github.com/awscommunitydaybrasil/codigo-de-conduta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Código de conduta
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
