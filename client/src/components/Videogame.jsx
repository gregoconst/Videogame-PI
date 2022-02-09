import React from 'react';

const Videogame = ({
	id,
	name,
	genres,
	img,
	description,
	released,
	rating,
	platforms,
}) => {
	
	return (
			<div className='div_videogame1' key={id}>
				<div className='div_img'>
					<img src={img} width="220" height="220" className='img' alt='image' />
					<div className='div_type_container'>
						{genres &&
							genres.map((el, i) => (
								<div key={i} >
									<p key={el.name} className='p'>
										{el.name}
									</p>
								</div>
							))}
					</div>
				</div>
				<div className='div_title'>
					<h1>{name}</h1>
				</div>
				<div className='div_vGamedetails'>
                    <div>{description}</div>
                    <div>{released}</div>
                    <div>{rating}</div>
                    <div>{platforms && platforms.map((e) => (
                      <div key={e.id}>
                      {e.name}
                  </div>
                    ))}</div>
				</div>
			</div>
	);
};

export default Videogame;