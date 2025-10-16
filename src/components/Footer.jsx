import '../style/Footer.css'

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy;PiZone {year}.  Made with ❤️ and React .</p>
            </div>
        </footer>
    );
}