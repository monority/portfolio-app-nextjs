'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { Project } from "../../../../types/index"

const MIN_ZOOM = 1
const MAX_ZOOM = 3.2
const ZOOM_STEP = 0.2
const COMPACT_GALLERY_IMAGES = new Set([
    "/images/projects/dashboard/dashboard-3.webp",
    "/images/projects/dashboard/dashboard-4.webp",
])

function clampZoom(value: number) {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))))
}

function isCompactGalleryImage(projectId: string, imagePath: string) {
    return projectId === "dashboard-rch" && COMPACT_GALLERY_IMAGES.has(imagePath)
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const updateMatches = () => setMatches(mediaQuery.matches)
        updateMatches()

        mediaQuery.addEventListener("change", updateMatches)

        return () => mediaQuery.removeEventListener("change", updateMatches)
    }, [query])

    return matches
}

export default function ProjectVisual({ project, locale }: { project: Project; locale: "fr" | "en" }) {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const gallery = (isDesktop ? project.galleryDesktop : undefined) ?? project.gallery ?? [project.visual]
    const hasMultiple = gallery.length >= 2
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
    const [zoom, setZoom] = useState(MIN_ZOOM)
    const activeImage = gallery[activeSlide]
    const isCompactSlide = isCompactGalleryImage(project.id, activeImage)

    useEffect(() => {
        setActiveSlide(0)
    }, [gallery.length, project.id])

    useEffect(() => {
        if (!isFullscreenOpen) return undefined

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isFullscreenOpen])

    useEffect(() => {
        if (!isFullscreenOpen) return undefined

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFullscreenOpen(false)
            if (hasMultiple && event.key === "ArrowLeft") {
                event.preventDefault()
                setActiveSlide((current) => (current === 0 ? gallery.length - 1 : current - 1))
            }
            if (hasMultiple && event.key === "ArrowRight") {
                event.preventDefault()
                setActiveSlide((current) => (current === gallery.length - 1 ? 0 : current + 1))
            }
            if (event.key === "+" || event.key === "=") {
                event.preventDefault()
                setZoom((current) => clampZoom(current + ZOOM_STEP))
            }
            if (event.key === "-") {
                event.preventDefault()
                setZoom((current) => clampZoom(current - ZOOM_STEP))
            }
            if (event.key === "0") {
                event.preventDefault()
                setZoom(MIN_ZOOM)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [gallery.length, hasMultiple, isFullscreenOpen])

    const goToPrevious = () => setActiveSlide((current) => (current === 0 ? gallery.length - 1 : current - 1))
    const goToNext = () => setActiveSlide((current) => (current === gallery.length - 1 ? 0 : current + 1))
    const openFullscreen = () => { setIsFullscreenOpen(true); setZoom(MIN_ZOOM) }
    const closeFullscreen = () => setIsFullscreenOpen(false)

    const zoomLabel = locale === "fr" ? "Zoom" : "Zoom"
    const fullscreenLabel = locale === "fr" ? "Ouvrir la galerie en plein écran" : "Open fullscreen gallery"
    const resetZoomLabel = locale === "fr" ? "Réinitialiser le zoom" : "Reset zoom"
    const closeLabel = locale === "fr" ? "Fermer la modal" : "Close modal"

    return (
        <div className="project-bento__visual">
            <div className="project-bento__gallery">
                <div className="project-bento__gallery-main">
                    <button type="button" className="project-bento__gallery-stage" onClick={openFullscreen} aria-label={fullscreenLabel}>
                        <AnimatePresence mode="wait">
                            <motion.div key={`${project.id}-${activeSlide}`} className={`project-bento__gallery-slide${isCompactSlide ? " project-bento__gallery-slide--compact" : ""}`} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.985 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                                <Image src={activeImage} alt={`${project.titleDisplay} — ${activeSlide + 1}`} fill sizes="(max-width: 900px) 100vw, 66vw" className="project-bento__gallery-img project-bento__gallery-img--main" priority />
                            </motion.div>
                        </AnimatePresence>
                    </button>

                    <div className="project-bento__gallery-topbar">
                        <button type="button" className="project-bento__fullscreen-btn" onClick={openFullscreen} aria-label={fullscreenLabel}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M5.25 1.75H1.75V5.25M9.75 1.75H13.25V5.25M13.25 9.75V13.25H9.75M1.75 9.75V13.25H5.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span>{locale === "fr" ? "Fullscreen" : "Fullscreen"}</span>
                        </button>
                    </div>

                    {hasMultiple && <>
                        <div className="project-bento__gallery-controls">
                            <button type="button" className="project-bento__gallery-nav" onClick={goToPrevious} aria-label={locale === "fr" ? "Image précédente" : "Previous image"}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                            <button type="button" className="project-bento__gallery-nav" onClick={goToNext} aria-label={locale === "fr" ? "Image suivante" : "Next image"}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                        </div>

                        <div className="project-bento__gallery-footer">
                            <div className="project-bento__gallery-progress" aria-hidden="true">
                                {gallery.map((_, index) => <span key={`${project.id}-dot-${index}`} className={`project-bento__gallery-dot${index === activeSlide ? " project-bento__gallery-dot--active" : ""}`} />)}
                            </div>
                            <span className="project-bento__gallery-count">{String(activeSlide + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
                        </div>

                        <div className="project-bento__gallery-rail">
                            {gallery.map((image, index) => <button key={`${project.id}-thumb-${index}`} type="button" className={`project-bento__gallery-rail-item${index === activeSlide ? " project-bento__gallery-rail-item--active" : ""}`} onClick={() => setActiveSlide(index)} aria-label={locale === "fr" ? `Voir l'image ${index + 1}` : `View image ${index + 1}`} aria-pressed={index === activeSlide}><span className="project-bento__gallery-rail-image"><Image src={image} alt="" fill sizes="64px" className="project-bento__gallery-img" /></span></button>)}
                        </div>
                    </>}
                </div>
            </div>

            <AnimatePresence>
                {isFullscreenOpen && <motion.div className="project-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeFullscreen}>
                    <motion.div className="project-modal__surface" initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.titleDisplay} gallery`}>
                        <div className="project-modal__toolbar">
                            <div className="project-modal__heading">
                                <span className="project-modal__eyebrow">{project.titleDisplay}</span>
                                <span className="project-modal__count">{String(activeSlide + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
                            </div>

                            <div className="project-modal__zoom-group">
                                <button type="button" className="project-modal__tool-btn" onClick={() => setZoom((current) => clampZoom(current - ZOOM_STEP))} aria-label={locale === "fr" ? "Réduire le zoom" : "Zoom out"}>-</button>
                                <label className="project-modal__zoom-slider-wrap">
                                    <span className="project-modal__zoom-label">{zoomLabel}</span>
                                    <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} step={ZOOM_STEP} value={zoom} onChange={(event) => setZoom(clampZoom(Number(event.target.value)))} className="project-modal__zoom-slider" aria-label={zoomLabel} />
                                    <span className="project-modal__zoom-value">{zoom.toFixed(1)}x</span>
                                </label>
                                <button type="button" className="project-modal__tool-btn" onClick={() => setZoom((current) => clampZoom(current + ZOOM_STEP))} aria-label={locale === "fr" ? "Augmenter le zoom" : "Zoom in"}>+</button>
                                <button type="button" className="project-modal__tool-btn project-modal__tool-btn--text" onClick={() => setZoom(MIN_ZOOM)} aria-label={resetZoomLabel}>1x</button>
                            </div>

                            <button type="button" className="project-modal__close-btn" onClick={closeFullscreen} aria-label={closeLabel}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </button>
                        </div>

                        <div className="project-modal__body">
                            {hasMultiple && <button type="button" className="project-modal__nav" onClick={goToPrevious} aria-label={locale === "fr" ? "Image précédente" : "Previous image"}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M10.75 4.5L6.25 9L10.75 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}

                            <div className="project-modal__viewport">
                                <div className="project-modal__image-shell">
                                    <motion.div key={`${project.id}-modal-${activeSlide}`} className={`project-modal__image-zoom${isCompactSlide ? " project-modal__image-zoom--compact" : ""}`} animate={{ scale: zoom }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                                        <Image src={activeImage} alt={`${project.titleDisplay} — ${activeSlide + 1}`} fill sizes="100vw" className={`project-modal__image${isCompactSlide ? " project-modal__image--compact" : ""}`} priority />
                                    </motion.div>
                                </div>
                            </div>

                            {hasMultiple && <button type="button" className="project-modal__nav" onClick={goToNext} aria-label={locale === "fr" ? "Image suivante" : "Next image"}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M7.25 4.5L11.75 9L7.25 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}
                        </div>

                        {hasMultiple && <div className="project-modal__filmstrip">{gallery.map((image, index) => <button key={`${project.id}-modal-thumb-${index}`} type="button" className={`project-modal__thumb${index === activeSlide ? " project-modal__thumb--active" : ""}`} onClick={() => setActiveSlide(index)} aria-label={locale === "fr" ? `Afficher l'image ${index + 1}` : `Show image ${index + 1}`} aria-pressed={index === activeSlide}><span className="project-modal__thumb-image"><Image src={image} alt="" fill sizes="72px" className="project-bento__gallery-img" /></span></button>)}</div>}
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}
