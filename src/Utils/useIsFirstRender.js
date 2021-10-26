import {useEffect,useRef} from 'react'
function useIsFirstRender() {
    const isRenderRef = useRef(true);
    useEffect(() => {
      isRenderRef.current = false;
    }, []);
    return isRenderRef.current;
  }
  
  export default useIsFirstRender;