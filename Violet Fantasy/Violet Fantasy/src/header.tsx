function Header() {
    const styles = {
        
        headerStyle: {
            //background:'grey',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            
        },
        h1Style: {
            margin: '0',
            padding: '0 20px', // Gives some space on the sides
            color: '#ffffff', // White color for the text
            fontSize: '1.5rem', // Adjust font size as needed
            fontWeight: 'normal', // Avoids bold if that's the preference
            textAlign: 'left', // Aligns text to the left
            flex: '1', // Allows the h1 to grow and align properly with flexbox
            textTransform: 'uppercase', // Example stylistic choice for uppercase letters
            letterSpacing: '1px' // Adjusts spacing between letters
        },
        navStyle: {
            display: 'flex',
            padding: '0',
            margin: '0',
            listStyleType: 'none',
            justifyContent: 'flex-end', // Aligns navigation items to the right
            flex: '2' // Allows the navigation to grow as needed
        },
        linkStyle: {
            display: 'block',
            padding: '15px 20px',
            margin: '0 10px',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#ffffff',
        }
    };

    return (
        <header style={styles.headerStyle}>
            <h1 style={styles.h1Style}>Violet Fantasy</h1>
            <nav>
                <ul style={styles.navStyle}>
                    <li><a href="#" style={styles.linkStyle}>Home</a></li>
                    <li><a href="#" style={styles.linkStyle}>About</a></li>
                    <li><a href="#" style={styles.linkStyle}>Service</a></li>
                    <li><a href="#" style={styles.linkStyle}>Contact</a></li>
                </ul>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header;