import Menu from "../components/menu/Menu"

export const metadata = {
    title: 'Inicio',
    description: 'Página de inicio',
  }

export default function Home(){    
    return(
        <main>
            <Menu flag='home' />
        </main>
    )

}           