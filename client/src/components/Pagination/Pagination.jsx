import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className={styles.pagesContainer}>
            {/* me lleva a la pagina anterior de donde estoy parada, 
            la deshabilito si es la primera */}
            <button
                id={currentPage - 1}
                onClick={handlePageChange}
                disabled={currentPage === 1}
                className={styles.button}
            >
                Prev
            </button>
            {/* si me paro en la ultima pagina, muestro 2 anteriores */}
            {currentPage === totalPages && totalPages > 3 && (
                <button
                    id={currentPage - 2}
                    onClick={handlePageChange}
                    className={styles.button}
                >
                    {currentPage - 2}
                </button>
            )}
            {/* si existe, muestro el numero de la pagina anterior */}
            {currentPage > 1 && (
                <button
                    id={currentPage - 1}
                    onClick={handlePageChange}
                    className={styles.button}
                >
                    {currentPage - 1}
                </button>
            )}
            {/* distingo la pagina a donde estoy parada */}
            <button
                id={currentPage}
                onClick={handlePageChange}
                className={styles.buttonSelected}
            >
                {currentPage}
            </button>
            {/* muestro el numero de pagina siguiente */}
            {currentPage < totalPages && (
                <button
                    id={currentPage + 1}
                    onClick={handlePageChange}
                    className={styles.button}
                >
                    {currentPage + 1}
                </button>
            )}
            {/* si existe, muestro la pagina siguiente + 1 de donde estoy parada */}
            {currentPage === 1 && totalPages > 3 && (
                <button
                    id={currentPage + 2}
                    onClick={handlePageChange}
                    className={styles.button}
                >
                    {currentPage + 2}
                </button>
            )}
            {/* muestro el boton de next para avanzar de a una pagina desde donde estoy parada
            deshabilito el boton si es la ultima */}
            <button
                id={currentPage + 1}
                onClick={handlePageChange}
                disabled={currentPage === totalPages}
                className={styles.button}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;