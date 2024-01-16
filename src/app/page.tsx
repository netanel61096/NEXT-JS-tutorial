//domain.co.il/

export const metadata = {
    title: "Home | Next.js tutorial",
    description: "Home description | Next.js tutorial",
    icons:{
        icon:"/Home.ico"
    }
  };

  export const dynamic= 'force-static'



export default function HomePage(){
    return(
        <>
        <header>
            <h1>home page</h1>
        </header>
        </>
    )
}