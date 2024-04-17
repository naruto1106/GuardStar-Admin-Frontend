
import Button from "../components/Button";

const Home = () => {

    return (
        <>
            <div className="flex justify-center">
                <div className="w-[550px] flex justify-between">
                    <Button size="normal" name="Opening Checks" variant="secondary-normal" />
                    <Button size="small" name="Click To Fill" variant="secondary-small" />
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <div className="w-[550px] flex justify-between">
                    <Button size="normal" name="Closing Checks" variant="primary-normal" />
                    <Button size="small" name="Click To Fill" variant="primary-small" />
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <div className="w-[550px] flex justify-between">
                    <Button size="normal" name="Incidents - Add" variant="primary-normal" />
                    <Button size="small" name="Click To Fill" variant="primary-small" />
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <div className="w-[600px] flex justify-between flex-wrap">
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>
                    <div className="w-[150px] m-2 text-[20px] text-center px-5 py-3 border-2 border-green">
                        FRIDGE 1 5'c
                    </div>

                </div>
            </div>
        </>

    )
}

export default Home;