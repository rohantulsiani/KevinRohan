import {addEntity, removeEntity} from '../src/firebase';



describe('Firebase Backend', ()=>{
	let reference;

//	black box test
	it('add entity backend api', async ()=>{
		
		expect.assertions(1);
		const toPushTest = [
			'Poll',
			['test1', 'test2'],
			'ethantest@usc.edu', 
			'about to get deleted', 
			'test', 
			false, 
			'test', 
			'nothing',
			['tag1','tag2']
		];

		try{
			const unwrappedPromise = await addEntity(...toPushTest);
			reference = unwrappedPromise.path.pieces_[1];
			expect(unwrappedPromise).toBeTruthy();
		}catch(error)
		{
			console.log(error.message);
		}
	});

	//black box test
	it('remove entity backend api', async ()=>{

		expect.assertions(1);
		try{
			const unwrappedPromise = await removeEntity(reference);
			expect(unwrappedPromise).toBeUndefined();
		}catch(error){
			console.log(error.message);
		}

	});
});