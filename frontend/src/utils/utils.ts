export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  export function isEmpty(arg:any){
    return (
      arg == null || // Check for null or undefined
      arg.length === 0 || // Check for empty String (Bonus check for empty Array)
      (typeof arg === 'object' && Object.keys(arg).length === 0) // Check for empty Object or Array
    );
  }
  
  // Function to build query string
export function buildQueryString(params:any) {
  const queryString = Object.keys(params)
    .filter(key => !isEmpty(params[key])) // Exclude parameters with empty values
    .map(key => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(params[key]);
      return `${encodedKey}=${encodedValue}`;
    }).join('&');
  return queryString;
}

interface CustomObject {
  [key: string]: any;
}

export function sortByKey<T extends CustomObject>(property: keyof T) {
  return (a: T, b: T) => {
    const valueA = String(a[property]).toLowerCase();
    const valueB = String(b[property]).toLowerCase();

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  };
}