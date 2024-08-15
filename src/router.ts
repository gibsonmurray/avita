import Avita, { $ } from "./avita"
import { div } from "./elements"

export default class AvitaRouter {
    private routes: {
        [path: string]: {
            element: Avita<HTMLElement | SVGElement>
            title?: string
        }
    } = {}
    private root: Avita<HTMLElement | SVGElement> | null = null
    private notFoundPath: {
        element: Avita<HTMLElement | SVGElement>
        title?: string
    } | null = null

    /**
     * Constructs a new AvitaRouter instance and sets the root element for rendering.
     * @param rootElementId - The ID of the root HTML element where the router will render content.
     * @throws {Error} If the root element with the specified ID is not found.
     */
    constructor(rootElementId: string = "#root") {
        const root = $(rootElementId)
        if (!root) {
            throw new Error(
                `Root element with ID "${rootElementId}" not found.`
            )
        }
        this.root = root

        // Listen to popstate events (browser back/forward navigation)
        window.addEventListener("popstate", () => {
            this.loadRoute(window.location.pathname)
        })
    }

    /**
     * Registers a route with the specified path and the corresponding Avita element to render.
     * @param path - The URL path to associate with the Avita element.
     * @param avitaElement - The Avita element to render when the specified path is navigated to.
     */
    register(
        path: string,
        avitaElement: Avita<HTMLElement | SVGElement>,
        title?: string
    ) {
        this.routes[path] = { element: avitaElement, title: title }
    }

    /**
     * Sets the not found path for the router.
     * @param avitaElement - The Avita element to render when a route is not found.
     */
    setNotFound(avitaElement: Avita<HTMLElement | SVGElement>, title?: string) {
        this.notFoundPath = { element: avitaElement, title: title }
    }

    /**
     * Navigates to a specific route and loads the corresponding HTML content.
     * @param path - The URL path to navigate to.
     */
    navigate(path: string) {
        window.history.pushState({}, path, window.location.origin + path)
        this.loadRoute(path)
        window.dispatchEvent(new Event("popstate"))
    }

    /**
     * Loads the content for the current route.
     * @param path - The URL path to load.
     */
    private loadRoute(path: string) {
        const route = this.routes[path]
        if (route) {
            this.clearRoot()
            Avita.render(route.element)
            document.title = route.title || path
        } else if (this.notFoundPath) {
            this.clearRoot()
            Avita.render(this.notFoundPath.element)
            document.title = this.notFoundPath.title || "Not Found"
        } else {
            this.displayError(`No route found for path: ${path}`)
        }
        Avita.scrollToTop()
    }

    /**
     * Clears the root element's content.
     */
    private clearRoot() {
        this.root?.clear().empty()
    }

    /**
     * Displays an error message in the root element.
     * @param message - The error message to display.
     */
    private displayError(message: string) {
        const errorElement = div().text(message)
        Avita.render(errorElement)
    }
}
