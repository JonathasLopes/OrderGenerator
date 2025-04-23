import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <h4>© Copyright {new Date().getFullYear()} - Order Generator</h4>
        </div>
    )
}

export default Footer;