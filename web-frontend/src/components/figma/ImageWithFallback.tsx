import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  // default alt to empty string to satisfy accessibility/SEO when caller doesn't provide one
  // and default loading to 'lazy' unless caller explicitly requests otherwise.
  const { src, alt = '', style, className, loading, ...rest } = props
  const imgLoading = (loading as 'lazy' | 'eager' | 'auto') ?? 'lazy'

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
      role="img"
      aria-label={alt || 'Image unavailable'}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <img src={ERROR_IMG_SRC} alt={alt || 'Error loading image'} loading={imgLoading} {...rest} data-original-url={src} className="max-w-full max-h-40 object-contain" />
        {/* Show product/category name visibly when available so users know what the image was */}
        {alt ? (
          <div className="mt-2 text-sm text-muted-foreground truncate">{alt}</div>
        ) : (
          <div className="mt-2 text-sm text-muted-foreground">Image unavailable</div>
        )}
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} loading={imgLoading} {...rest} onError={handleError} />
  )
}
