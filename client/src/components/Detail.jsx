import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVideogameDetail, clearVideogameDetail } from './../actions/index';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Videogame from './Videogame';


export const Detail = () => {
  return <div>
    hola
  </div>;
};

// export function Details(
//   videogamesDetail,
//   getVideogameDetail,
//   clearVideogameDetail
// ){
//  let {id} = useParams;
// // const dispatch = useDispatch;
// // // const [getVideogameDetail, setgetVideogameDetail] = useState(null);
// // const videogameDetail = useSelector((state) => state.videogamesDetail);
// // useEffect(() => {
// //   dispatch(getVideogameDetail(id));
// //   return () => clearVideogameDetail();
// // }, []);
// useEffect(() => {
//   getVideogameDetail(id);
//   return () => clearVideogameDetail();
// }, []);
// console.log(videogamesDetail, "aaaaaaaaaaaaaa")
// return (
//   <div>
// 		<div className= 'div_home'>
// 			{videogamesDetail && (
// 				<Videogame
// 					id={videogamesDetail.id}
// 					name={videogamesDetail.name}
// 					genres={videogamesDetail.genres}
// 					img={videogamesDetail.img}
// 					description={videogamesDetail.description}
// 					released={videogamesDetail.released}
// 					rating={videogamesDetail.rating}
// 					platforms={videogamesDetail.platforms}
// 				/>
// 			)}
// 		</div>
// 		</div>
// )
// };
// const mapStateToProps = (state) => {
// 	console.log(state.videogamesDetail)
// 	return {
// 		videogamesDetail: state.videogamesDetail,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getVideogameDetail: (id) => dispatch(getVideogameDetail(id)),
// 		clearVideogameDetail: () => dispatch(clearVideogameDetail()),
// 	};
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Details);
// const [vGameDetails, setvGameDetails] = useState(null);
// let {id} = useParams();

// useEffect(() => {
//     axios.get(`http://localhost:3001/videogame/${id}`)
//         .then((responseBack) => {
//             setvGameDetails(responseBack.data)
//         })

//         return() => {
//             setvGameDetails(null)   // CleanUp
//         }
// }, [id]);

// return (
//     <div className="details-container">
//         <body>
//             {/* HASTA QUE NO CARGUEN LOS DATOS HAY UN SPINNER DE "LOADING..." */}
//         {
//             vGameDetails ?
           
//            <div>
//                <h2><u>{vGameDetails.name}:</u></h2>
//                <img src={vGameDetails.background_image} alt="Img of videogames" style={{width: '650px', height:'530px', borderRadius:'4.3%'}}/>
//                <ul><h3><u>Rating:</u></h3> {vGameDetails.rating} </ul>
//                <ul><h3><u>Platforms:</u></h3> {vGameDetails.id?.length > 7 ? vGameDetails.platforms?.map(el => el.name).join(' || ')
//                 : vGameDetails.platforms?.map(el => el.platform.name).join(' || ') }.</ul>
//                <ul><h3><u>Genres:</u></h3> {vGameDetails.genres?.map(el => el.name).join(', ')}.</ul>
//                <ul><h3><u>Release Date:</u></h3> {vGameDetails.released || vGameDetails.releaseDate}.</ul>
//                <ul><h3><u>Description:</u></h3><p id='text'><strong> {vGameDetails.description_raw || vGameDetails.description } </strong></p></ul><br />
//            </div> 

//             :

//            <div><br/><br/><br/><br/>
//                 <h1 className="name-loading"> Loading... </h1><br /><br /><br/><br/><br/>
//                 <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><br/><br/><br/><br/><br/><br/><br/><br/>
//            </div>

//         }

//         <Link to={'/home'}>
//             <button><h2>Back to Home</h2></button>
//         </Link><br /><br />

//         </body>
//     </div>
// );