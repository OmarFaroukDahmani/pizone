import '../style/Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Pi Zone. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="">About</a></li>
                    <li><a href="">Our offers</a></li>
                    <li><a href="">Partners</a></li>
                    <li><a href="">Courses</a></li>
                </ul>
            </div>
        </footer>
    );
}