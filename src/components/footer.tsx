import { Popcorn } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="py-16 sm:py-32 mx-auto w-full max-w-6xl max-lg:px-4">
      <div className="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <a href="#" className="flex font-bold items-center" >
              <Popcorn className="rounded-lg w-9 h-9 mr-2" />
              <h3 className="text-2xl">Cinema Score</h3>
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contato</h3>
            <div>
              <a href="https://github.com/micaelgomestavares" target="_blank" className="opacity-60 hover:opacity-100">
                Github
              </a>
            </div>

            <div>
              <a href="https://www.linkedin.com/in/micaelgomestavares/" target="_blank" className="opacity-60 hover:opacity-100">
                Linkedin
              </a>
            </div>

            <div>
              <a href="mailto:contato.micaeloficial@gmail.com" className="opacity-60 hover:opacity-100">
                Email
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Redes Sociais</h3>
            <div>
              <a href="https://micael-portfolio.vercel.app/" target="_blank" className="opacity-60 hover:opacity-100">
                Portfolio
              </a>
            </div>

            <div>
              <a href="https://www.instagram.com/micaelgomes.dev/" target="_blank" className="opacity-60 hover:opacity-100">
                Instagram
              </a>
            </div>

            <div>
              <a href="https://x.com/Micazeera" target="_blank" className="opacity-60 hover:opacity-100">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section>
          <h3>
            &copy; 2024 Desenvolvido com o ❤️ por <a
              target="_blank"
              href="https://github.com/micaelgomestavares"
              className="text-primary transition-all border-primary hover:border-b-2"
            > Micael G. Tavares</a>
          </h3>
          <h3 className="mt-2"> Data Provider: <a
            target="_blank"
            href="https://www.themoviedb.org/?language=pt-BR"
            className="text-primary transition-all border-primary hover:border-b-2"
          >TMDB</a>
          </h3>
        </section>
      </div>
    </footer>
  )
}
