import { JellyfishSpinner } from 'react-spinners-kit';

const Spinner = ({ isLoading }) => {
	return (
		<div>
			<JellyfishSpinner size={70} color='#2F3B39' loading={isLoading} />
		</div>
	);
};

export default Spinner;
