import React from 'react'

const NewsItems =(props)=> {
  let {title, description,imgUrl,newsUrl,author,date,source} = props;
  {
    return (
      <div>
        
        <div className="card">
       <div>
       <span className=" badge rounded-pill bg-danger" style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: '0'
        }}>
   {source}
    <span className="visually-hidden">unread messages</span>
  </span>
       </div>
  <img src={!imgUrl?"https://dims.apnews.com/dims4/default/e14359a/2147483647/strip/true/crop/5175x2911+0+270/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F7d%2Fa3%2F48be96c00e2014d1b43795b37657%2Fe93ec3aa1a384424bc30ea847f080b24":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}
      </small></p>
    <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Go somewhere</a>

  </div>
</div>
      </div>
    )
  }

}
export default NewsItems