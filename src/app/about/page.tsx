//domain.co.il/about

export const metadata = {
    title: "About | Next.js tutorial",
    description: "About description | Next.js tutorial",
  };

export const dynamic= 'force-static'

export default function AboutPage(){
    return(
        <>
        <header>
            <h1>about page</h1>
        </header>
        </>
    )
}