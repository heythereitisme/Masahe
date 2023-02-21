import React from 'react'
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
    const navigate = useNavigate();
    
    const service = (s) => {
        navigate(`/client/services/${s}`)
       }

  return (
    <div className='bg-white'>
        <div className='bg-slate-100 p-5 drop-shadow-xl text-center'>
        <span className='text-3xl font-heading text-primary'>Services</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-10">

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Head-Massage.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Swedish Massage</h2>
    <p className=' font-body text-primary mb-2'>A gentle full-body massage.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("swedish")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Hotstone.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Hot Stone Massage</h2>
    <p className=' font-body text-primary mb-2'>This type of massage involves the use and placement of basalt River rock on different points of the body.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("hotstone")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Back-Massage.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Deep tissue massage</h2>
    <p className=' font-body text-primary mb-2'>Applying sustained pressure using slow, deep strokes to target the inner layers of your muscles and connective tissues.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("deeptissue")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Candle.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Aromatherapy</h2>
    <p className=' font-body text-primary mb-2'>Using essential oils for therapeutic benefit.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("aroma")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Foot-Massage.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Sports massage</h2>
    <p className=' font-body text-primary mb-2'>Those with repetitive use injury to a muscle, generally use to ease sports injuries.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("sports")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Neck-Massage.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Reflexology</h2>
    <p className=' font-body text-primary mb-2'>Reflexology uses gentle to firm pressure on different pressure points of the feet, hands, and ears.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("reflexology")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Back-Massage.jpg" alt="Massage" className='w-full h-60 object-cover' /></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Lymphatic drainage massage</h2>
    <p className=' font-body text-primary mb-2'>Gentle massage that encourages the lymph fluids to circulate through the body.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("lymphatic")}>Find</button>
    </div>
    </div>
</div>

<div className="card w-96 bg-slate-50 shadow-xl ml-1 md:ml-4">
    <figure><img src="/services/Acupuncture.jpg" alt="Massage" className='w-full h-60 object-cover'/></figure>
    <div className="card-body">
    <h2 className="card-title flex justify-center text-primary">Acupuncture</h2>
    <p className=' font-body text-primary mb-2'> Insertion of very thin needles through your skin at strategic points on your body.</p>
    <div className="card-actions justify-end">
    <button className="btn btn-secondary" onClick={() => service("acupuncture")}>Find</button>
    </div>
    </div>
</div>

        </div>
      </div>
  )
}

export default ServiceList