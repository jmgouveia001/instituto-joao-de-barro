import { PlusCircle } from "phosphor-react"
import { publish } from "../../../../utils/events"
import { OutletRegisterModal } from "./modals/OutletRegisterModal"
import { useContext, useEffect, useState } from "react"
import { OutletEditModal } from "./modals/OutletEditModal"
import { OutletContext } from "../../../../contexts/storage/OutletContext"

export const Outlet = () => {
   const {outletProducts, loadOutletProducts, handleEditOutletProduct} = useContext(OutletContext)
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        loadOutletProducts();
    }, []);

    const filteredMaterials = outletProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="page-title">Outlet</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar produto" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusCircle size={26} onClick={() => publish("outlet:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Código</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Status</th>
                        </tr>
                        {filteredMaterials.map((product) => (
                                <tr key={product.id} onClick={() => handleEditOutletProduct(product)}>
                                    <td>{product.name}</td>
                                    <td>{product.id}</td>
                                    <td>R${product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.status}</td>
                                </tr>
                            ))}
                    </thead>
                </table>
            </section>
            <OutletRegisterModal />
            <OutletEditModal />
        </>
    )
}