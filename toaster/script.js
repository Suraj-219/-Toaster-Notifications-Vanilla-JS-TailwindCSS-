function createToaster(config){
    const defaultConfig = {
        positionX: config && config.positionX ? config.positionX : "right",
        positionY: config && config.positionY ? config.positionY : "top", 
        theme: config && config.theme ? config.theme : "left",
        duration: config && config.duration ? config.duration : 3,
    };

    function getTypeClasses(theme, type){
        const light = {
            success: "bg-green-100 text-green-900",
            error: "bg-red-100 text-red-900",
            info: "bg-blue-100 text-blue-900",
            warning: "bg-yellow-100 text-yellow-900",
            default: "bg-gray-100 text-black",
        };
        const dark = {
            success: "bg-green-800 text-white",
            error: "bg-red-800 text-white",
            info: "bg-blue-800 text-white",
            warning: "bg-yellow-700 text-black",
            default: "bg-gray-800 text-white",
        };
        const palette = theme === "dark" ? dark : light;
        return palette[type] || palette.default;
    }

    function getDefaultIcon(type){
        switch(type){
            case "success": return "✔️";
            case "error": return "❌";
            case "info": return "ℹ️";
            case "warning": return "⚠️";
            default: return "";
        }
    }

    return function(message, options){
        const opts = options || {};
        const type = opts.type || "default";
        const icon = typeof opts.icon === "string" ? opts.icon : getDefaultIcon(type);
        const isClosable = !!opts.closable;
        const durationSeconds = typeof opts.duration === "number" ? opts.duration : defaultConfig.duration;

        const parent = document.querySelector(".parent");
        if(!parent){
            throw new Error("Parent element with class .parent not found");
        }

        if(defaultConfig.positionX !== "left" || defaultConfig.positionY !== "top"){
            const posXClass = defaultConfig.positionX === "right" ? "right-5" : "left-5";
            const posYClass = defaultConfig.positionY === "bottom" ? "bottom-5" : "top-5";
            const needsPosX = !parent.className.includes(posXClass);
            const needsPosY = !parent.className.includes(posYClass);
            if(needsPosX || needsPosY){
                parent.className += ` ${posXClass} ${posYClass}`;
            }
        }

        const container = document.createElement("div");
        const baseClasses = "inline-flex items-center gap-3 px-6 py-3 rounded shadow-lg transition-opacity duration-300 opacity-100";
        const pointerClasses = isClosable ? "pointer-events-auto" : "pointer-events-none";
        const colorClasses = getTypeClasses(defaultConfig.theme, type);
        container.className = `${baseClasses} ${pointerClasses} ${colorClasses}`;
        container.setAttribute("role", "status");
        container.setAttribute("aria-live", "polite");

        if(icon){
            const iconSpan = document.createElement("span");
            iconSpan.textContent = icon;
            iconSpan.className = "text-xl leading-none";
            container.appendChild(iconSpan);
        }

        const textSpan = document.createElement("span");
        textSpan.textContent = message;
        container.appendChild(textSpan);

        const fadeDurationMs = 300; 

        function dismiss(){
           
            container.classList.add("opacity-0");
            setTimeout(() => {
                if(parent.contains(container)){
                    parent.removeChild(container);
                }
            }, fadeDurationMs);
        }

        if(isClosable){
            const closeBtn = document.createElement("button");
            closeBtn.type = "button";
            closeBtn.innerHTML = "&times;";
            closeBtn.setAttribute("aria-label", "Close");
            closeBtn.className = "ml-4 opacity-80 hover:opacity-100 focus:outline-none";
            closeBtn.addEventListener("click", dismiss);
            container.appendChild(closeBtn);
        }

        (function attachSwipe(){
            let startX = 0;
            let dragging = false;
            function onDown(e){
                startX = e.clientX;
                dragging = true;
                try{ container.setPointerCapture(e.pointerId); }catch(_){}
            }
            function onMove(e){
                if(!dragging) return;
                const deltaX = e.clientX - startX;
                container.style.transform = `translateX(${deltaX}px)`;
                const opacity = Math.max(0, Math.min(1, 1 - Math.abs(deltaX)/150));
                container.style.opacity = String(opacity);
            }
            function onEnd(e){
                if(!dragging) return;
                dragging = false;
                try{ container.releasePointerCapture(e.pointerId); }catch(_){}
                const deltaX = e.clientX - startX;
                if(Math.abs(deltaX) > 60){
                    dismiss();
                } else {
                    container.style.transition = (container.style.transition ? container.style.transition + ", " : "") + "transform 200ms ease, opacity 200ms ease";
                    container.style.transform = "";
                    container.style.opacity = "";
                    setTimeout(() => {
                        container.style.transition = "";
                    }, 220);
                }
            }
            container.addEventListener("pointerdown", onDown);
            container.addEventListener("pointermove", onMove);
            container.addEventListener("pointerup", onEnd);
            container.addEventListener("pointercancel", onEnd);
            container.addEventListener("pointerleave", (e)=>{ if(dragging) onEnd(e); });
        })();

        parent.appendChild(container);

        if(durationSeconds > 0){
            setTimeout(dismiss, durationSeconds * 1000);
        }
    };
}

let toaster = createToaster({
    positionX: "left",
    positionY: "top",
    theme: "light",
    duration: 3,
});
// toaster("Download Complete!",{type: "success"});
setTimeout(()=>{
    toaster("File uploaded successfully", { type: "success", closable: true });
},2000);
setTimeout(()=>{
    toaster("Upload Failed!", {type: "error", closable: true});
},3000);
setTimeout(()=>{
    toaster("New Update Available!", {type: "info", closable: true});
},4000);
setTimeout(()=>{
    toaster("This is a warning message!", {type: "warning", closable: true});
},5000);