import Image from 'next/image'
import Link from 'next/link'

function Home(props: any) {
  let nbPage: Array<number> = []
  for (let i = 1; i < props.data.total_pages; i++) {
    nbPage.push(i)
  }
  return (<>
    <br />
    <Link href="/search">
      <a>Rechercher</a>
    </Link>
    <div className="container">
      {props.data.results.map(({ title, poster_path, overview }: any) => {
        return (<>
          <br />
          <div className="card mb-2">
            <div className="row g-0">
              <div className="col-md-2">
                <Image className="img-fluid rounded-start"
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  height={250}
                  width={150}
                  alt={title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text fw-light">{overview}</p>
                </div>
              </div>
            </div>
          </div>
        </>)
      })}
      <br />
      <p>
        page :
        {nbPage.map((page: any) => {
          return (<>
            <span>
              <Link href={`${props.url}&page=${page}`}>
                <a> {page} </a>
              </Link>
              | </span>
          </>)
        })}
      </p>
    </div>
    <footer>
      Mayska
    </footer>
  </>)
}

export async function getServerSideProps() {
  const URL: string = process.env.URL + "search/movie?" + "api_key=" + process.env.API_KEY + "&language=fr-FR&page=1&query=saw"
  const data: any[] = await fetch(URL)
    .then((res: any) => res.json())
    .catch((error: any) => console.log("Error : " + error))
  return {
    props: {
      data: data,
      url: URL
    },
  }
}

export default Home

