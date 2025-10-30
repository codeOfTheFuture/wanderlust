import { useAppSelector } from "../../store";
import { getToursStatus, selectTours } from "../../store/slices/toursSlice";
import ReactLoading from "react-loading";
import TourCard from "../tour-cards/TourCard";

interface Props {
	loading: boolean;
}

const SearchResults = ({ loading }: Props) => {
	const toursResults = useAppSelector(selectTours);
	const status = useAppSelector(getToursStatus);

	return (
		<div
			className={`justify-between h-[100vh] p-4 mt-20 lg:mt-0 flex flex-col w-full mx-auto bg-white relative ${
				(loading || status === "loading") && "overflow-hidden"
			}`}
		>
			{(loading || status === "loading") && (
				<div className="w-full absolute top-36 flex justify-center items-center z-50">
					<div className="flex justify-center items-center w-40 bg-white rounded-2xl">
						<ReactLoading
							type={"bars"}
							width={100}
							height={100}
							color="#2196f3"
							className="bg-transparent z-50"
						/>
					</div>
				</div>
			)}
			<div
				className={`grid grid-cols-1 md:grid-cols-2 mt-16 justify-start items-start gap-6 w-full ${
					(status === "loading" || loading) && "opacity-50"
				} `}
			>
				{toursResults?.results?.map(tour => (
					<TourCard key={tour._id.toString()} tour={tour} />
				))}
			</div>
		</div>
	);
};
export default SearchResults;
