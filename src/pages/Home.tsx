import { NavLink } from 'react-router-dom';

const Home = (props: { name: any; }) => {
   const {name} = props

    return (
        <div className='text-center'>
            <div>{name ? 
                <div>
                    <h3 className='text-success my-4'>Salut { name }</h3>
                    <div className='container'>
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4 bg-secondary">
                                    <div className="border border-white m-4 p-4">
                                      <NavLink to='/Plancg' className="btn btn-dark form-control text-white">Plan comptable</NavLink>
                                      <NavLink to='/Ecriture' className="btn btn-dark form-control text-white mt-3">Ecritures</NavLink>
                                    </div>
                                </div>
                            <div className="col-md-4"></div>
                        </div>
                    </div>
                </div> 
                : 
                <div>
                    <h3 className='text-dark my-4'>Vous n'êtes pas connecté !</h3>
                    <div className='container'>
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4 bg-secondary">
                                    <div className="border border-white m-4 p-4">
                                      <NavLink to='/Login' className="btn btn-dark form-control text-white">Plan comptable</NavLink>
                                      <NavLink to='/Login' className="btn btn-dark form-control text-white mt-3">Ecritures</NavLink>
                                    </div>
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                    </div>
                </div>
           }</div>
        </div>
    );
};

export default Home;