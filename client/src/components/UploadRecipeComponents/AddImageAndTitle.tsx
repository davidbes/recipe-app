import { Button, Input } from 'components';
import { FormDataType } from 'components/Modals/UploadRecipeModal';
import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoClose } from 'react-icons/io5';
import { CgSoftwareUpload } from 'react-icons/cg';
import './UploadRecipeComponents.scss';

interface Props {
	onChangeStep: (
		title: string,
		file: File,
		imgSrc: string,
		stepChange: number
	) => void;
	currTitle: string;
	currImage: File | null;
	currImageSrc: string;
}

const AddImageAndTitle: FC<Props> = ({
	onChangeStep,
	currTitle,
	currImage,
	currImageSrc,
}) => {
	const [title, setTitle] = useState<{ val: string; err: string }>({
		val: currTitle,
		err: '',
	});
	const [image, setImage] = useState<string>(currImageSrc);
	const [file, setFile] = useState<File | null>(currImage);

	const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return;
		}
		const file = acceptedFiles[0];

		setFile(file);

		const reader = new FileReader();
		reader.onload = (item) => {
			if (item.target?.result) {
				setImage(item.target.result as string);
			}
		};
		reader.readAsDataURL(file);
	}, []);

	const handleNext = useCallback(() => {
		if (file && title.val && image) {
			onChangeStep(title.val, file, image, +1);
		}
	}, [file, title, image]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

	return (
		<>
			<div className='form-content'>
				<div className='upload-image-section'>
					{image ? (
						<div className='uploaded-image'>
							<img src={image} alt='Recipe image' />
							<div className='close-image-button'>
								<Button
									type='tertiary'
									variation='neutral'
									iconOnly
									onClick={() => {
										setImage('');
										setFile(null);
									}}
								>
									<IoClose />
								</Button>
							</div>
						</div>
					) : (
						<div
							{...getRootProps({
								className: !isDragActive ? 'input-image' : 'input-image active',
							})}
						>
							<input {...getInputProps()} />
							<div>
								<CgSoftwareUpload size={30} />
								<span>Upload image</span>
								<span>drag and drop here</span>
							</div>
						</div>
					)}
				</div>

				<input
					className='title-input'
					placeholder={'Enter meal name...'}
					value={title.val || ''}
					onChange={(e) => setTitle({ val: e.target.value, err: '' })}
				/>

				<div className='error-section'>{title.err && title.err}</div>
			</div>
			<div className='button-section'>
				<Button onClick={handleNext}>Next</Button>
			</div>
		</>
	);
};

export default AddImageAndTitle;
