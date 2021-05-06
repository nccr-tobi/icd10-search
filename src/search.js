import lunr from 'lunr';
import * as R from 'ramda'
import clinicalDiagnosis from '../clinical-diagnosis.json';

const {pipe: _, take, map} = R

export const index = lunr(function () {
	this.field('VALUE');
	this.field('CONCEPT_CODE');

	clinicalDiagnosis.map(({ VALUE, CONCEPT_CODE }, id) =>
		this.add({
			id,
			VALUE,
			CONCEPT_CODE
		})
	);
});

export const search = async ({ searchTerm, limit }) => {
	const length = searchTerm?.length ?? 0;
	const results = length < 2 ? [] : await index.search(searchTerm);
	return {
		meta: { count: await results.length },
		data: _(
			take(limit),
			map((result) => clinicalDiagnosis[result.ref])
		)(await results)
	};
};
