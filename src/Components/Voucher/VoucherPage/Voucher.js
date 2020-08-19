import React, { useState, useEffect } from 'react';
import Vouchers from '../Vouchers.json';
import VoucherHeader from '../Header/VoucherHeader';
import VoucherCards from '../VoucherCards/VoucherCards';
import { MyContext } from '../../../context/MyProvider';
import './Voucher.css';


const Voucher = () => {

    const [vouchers, setVouchers] = useState([]);
    const [chosenVoucher, setChosenVoucher] = useState([]);
    const [choseVoucher, setToChosen] = useState(false);
    // const { usedVouchers } = React.useContext(MyContext);
    const { updateVoucherHistory } = React.useContext(MyContext);



    useEffect(() => {
        setVouchers(Vouchers['vouchers']);
    }, []);


    const selectVoucher = (event) => {
        const voucherIndex = event.target.id;
        const selectedVoucher = vouchers[voucherIndex];
        let myVoucher = [...chosenVoucher];
        myVoucher.push(selectedVoucher);
        setChosenVoucher(myVoucher);
        console.log(myVoucher);
        setToChosen(true);
    };

    const pushToVoucherHistory = () => {
        updateVoucherHistory(chosenVoucher[0].title);
    }

    return (

        <React.Fragment>

            <div className="wrapper">
                <VoucherHeader />
                <div>
                    {
                        vouchers.map((vouch, index) =>
                            <VoucherCards key={index}
                                id={index}
                                imageClass={'voucherImage'}
                                image={vouch.image}
                                title={vouch.title}
                                text={vouch.text}
                                action={selectVoucher}
                                buttonPrint={vouch.button} />)
                    }
                </div>
                <div >
                    {chosenVoucher.map((voucher, index) =>
                        <section className="popUpWindow" >
                            <h2 key={index} >{voucher.title} ({voucher.quantity})</h2>
                            <p>{voucher.text}</p>
                            <img src={voucher.image}></img>
                            <button onClick={pushToVoucherHistory}>{voucher.button}</button>
                        </section>)
                    }
                </div>
            </div>
        </React.Fragment>

    )
};

export default Voucher;