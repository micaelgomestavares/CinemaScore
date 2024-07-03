import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Clapperboard, HomeIcon, LogOut, Menu, MonitorPlay, NotebookPenIcon, PopcornIcon, UserIcon } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import SearchComponent from "../search";
import { useAuth } from "@/services/supabase/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  const [popularMovieInfo, setPopularMovieInfo] = useState<any | null>(null);
  const [popularSeriesInfo, setPopularSeriesInfo] = useState<any | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchPopularMovies().then((data) => {
      setPopularMovieInfo(data.results[0]);
    }).catch(error => {
      console.error("Error fetching popular movies: ", error);
    });

    api.fetchPopularSeries().then((data) => {
      setPopularSeriesInfo(data.results[0]);
    }).catch(error => {
      console.error("Error fetching popular series: ", error);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      {/* Desktop Navbar */}
      <div className="w-full border-b bg-background p-4 max-lg:hidden">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PopcornIcon />
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link className={navigationMenuTriggerStyle()} to="/">
                        <HomeIcon className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Ínicio
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Clapperboard className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Filmes
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          {popularMovieInfo && (
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                              to={"/filmes/" + popularMovieInfo.id}>
                              <img src={"https://image.tmdb.org/t/p/w500/" + popularMovieInfo.poster_path} alt="" className="w-full h-full" />
                            </Link>
                          )}
                        </li>
                        <ListItem href="/filmes/populares" title="🤩 Populares">
                          Os filmes mais populares neste momento.
                        </ListItem>
                        <ListItem href="/filmes/melhores-avaliados" title="⭐ Melhores Avaliados">
                          Os filmes melhores avaliados da história do cinema
                        </ListItem>
                        <ListItem href="/filmes/estreias" title="📅 Próximas estreias">
                          Os filmes que ainda vão lançar no Brasil
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <MonitorPlay className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Séries
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          {popularSeriesInfo && (
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                              to={"/series/" + popularSeriesInfo.id}>
                              <img src={"https://image.tmdb.org/t/p/w500/" + popularSeriesInfo.poster_path} alt="" className="w-full h-full" />
                            </Link>
                          )}
                        </li>
                        <ListItem href="/series/populares" title="🤩 Populares">
                          As séries mais populares nesse momento.
                        </ListItem>
                        <ListItem href="/series/melhores-avaliados" title="⭐ Melhores Avaliadas">
                          As séries mais bem avaliadas da história da TV.
                        </ListItem>
                        <ListItem href="/series/estreias" title="📅 Próximas estreias">
                          Séries que vão lançar episódios nos próximos 7 dias.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {user && (
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link className={navigationMenuTriggerStyle()} to="/diario">
                          <NotebookPenIcon className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Diário
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-2">
              <SearchComponent></SearchComponent>

              <ModeToggle />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${user.username}`} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">

                    <DropdownMenuItem>
                      <Link to={'/diario'} className="flex items-center gap-1.5 rounded-md p-2 hover:cursor-pointer hover:bg-muted w-full">
                        <NotebookPenIcon size={16} className="ml-1.5" />
                        <p className="text-sm">Meu Diário</p>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className=" cursor-pointer outline-none"
                      onClick={() => handleLogout()}
                    >
                      <div className="flex items-center gap-1.5 rounded-md p-2 hover:cursor-pointer hover:bg-muted">
                        <LogOut size={16} className="ml-1.5" />
                        <p className="text-sm">
                          Logout
                        </p>
                      </div>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild><Link to="/login">Entrar</Link></Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex flex-col lg:hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger aria-describedby="Mobile Navbar" asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>

            </SheetTrigger>

            <SheetContent aria-description="Mobile Navbar" side="left" className="flex flex-col">
              <DialogTitle></DialogTitle>
              <nav className="grid gap-2 text-lg font-medium">
                <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
                  <HomeIcon className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Ínicio
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <Clapperboard className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Filmes
                  </span>
                  <ul className="ml-4">

                    <li>
                      <Link to="/filmes/populares" className="block select-none p-3 no-underline outline-none">
                        🤩 Populares
                      </Link>
                    </li>
                    <li>
                      <Link to="/filmes/melhores-avaliados" className="block select-none p-3 no-underline outline-none">
                        ⭐ Melhores Avaliados
                      </Link>
                    </li>
                    <li>
                      <Link to="/filmes/estreias" className="block select-none p-3 no-underline outline-none">
                        📅 Próximas estreias
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">
                    <MonitorPlay className="mr-2" size={16} strokeWidth={1.25} absoluteStrokeWidth /> Séries
                  </span>
                  <ul className="ml-4">

                    <li>
                      <Link to="/series/populares" className="block select-none p-3 no-underline outline-none">
                        🤩 Populares
                      </Link>
                    </li>
                    <li>
                      <Link to="/series/melhores-avaliados" className="block select-none p-3 no-underline outline-none">
                        ⭐ Melhores Avaliadas
                      </Link>
                    </li>
                    <li>
                      <Link to="/series/estreias" className="block select-none p-3 no-underline outline-none">
                        📅 Próximas estreias
                      </Link>
                    </li>
                  </ul>
                </div>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger><span className="flex flex-row gap-2 items-center align-middle justify-center border p-2 rounded-lg mt-auto"><UserIcon></UserIcon>Minha Conta</span></DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">

                      <DropdownMenuItem>
                        <Link to={'/diario'} className="flex items-center gap-1.5 rounded-md p-2 hover:cursor-pointer hover:bg-muted w-full">
                          <NotebookPenIcon size={16} className="ml-1.5" />
                          <p className="text-sm"> Diário </p>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className=" cursor-pointer outline-none"
                        onClick={() => handleLogout()}
                      >
                        <div className="flex items-center gap-1.5 rounded-md p-2 hover:cursor-pointer hover:bg-muted">
                          <LogOut size={16} className="ml-1.5" />
                          <p className="text-sm">
                            Logout
                          </p>
                        </div>
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild><Link to="/login">Entrar</Link></Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <SearchComponent></SearchComponent>
        </header>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
