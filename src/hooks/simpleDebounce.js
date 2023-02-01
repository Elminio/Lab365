export function simpleDebounce(functionDebounce, timer, timeout = 400){
	clearTimeout(timer.value);
	timer.value = setTimeout(() => {
		functionDebounce();
	}, timeout);
}
