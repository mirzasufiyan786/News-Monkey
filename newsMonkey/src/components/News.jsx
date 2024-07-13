import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    const upDateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let paresdData = await data.json()
        props.setProgress(70);
        console.log(paresdData);
        setArticles(paresdData.articles)
        setTotalResults(paresdData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        upDateNews();
    }, [])

    // const handelPrevbutton = async () => {
    //       setPage(page-1)
    //     upDateNews();
    // }

    // const handelNextbutton = async () => {
    // setPage(page+1)
    //     upDateNews();
    // }
    const fetchMoreData = async () => {
        setPage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        let paresdData = await data.json()
        console.log(paresdData);
        setArticles(articles.concat(paresdData.articles))
        setTotalResults(paresdData.totalResults) 
    };

    return (
        <>
            <h1 className='text-center my-4'>MonkeyNews - Top {capitalizeFirstLetter(props.category)} headlines </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems  title={element.title ? element.title : ""} 
                                description={element.description ? element.description : ""}
                                 newsUrl={element.url} imgUrl={element.urlToImage}
                                    date={element.publishedAt} author={element.author} source={element.source.name}
                                />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>

            {/* next and previou button code */}
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} onClick={handelPrevbutton} type="button" className="btn btn-dark">&larr; Previous</button>
                    <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize))} onClick={handelNextbutton} type="button" className="btn btn-dark">Next &rarr;</button>

                </div> */}
        </>

    )

}

News.defaultProps = {
    pageSize: 8,
    category: 'general',
    country: 'us',
}

News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
}
export default News
