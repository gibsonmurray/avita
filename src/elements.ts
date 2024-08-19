import type { Children } from "./avita"
import Avita from "./avita"

export function element<T extends HTMLElement>(
    tag: string,
    children: Children<T>
): Avita<HTMLElement> {
    return new Avita(tag, children)
}

/**
 * Creates A new `Avita<div>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {Children<T>} children - The children of the `div` element.
 * @returns {Avita<HTMLElement>} A new Avita wrapped `div>` element.
 */
export function div<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("div", children) 
}

/**
 * Creates a new `Avita<span>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {Children<T>} children - The children of the `span` element.
 * @returns {Avita<HTMLElement>} A new Avita wrapped `span>` element.
 */
export function span<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("span", children)
}

/**
 * Creates a new `Avita<button>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {Children<T>} children - The children of the `button` element.
 * @returns {Avita<HTMLElement>} A new Avita wrapped `button>` element.
 */
export function button<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("button", children)
}

/**
 * Creates a new `Avita<input>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {Children<T>} children - The children of the `input` element.
 * @returns {Avita<HTMLElement>} A new Avita wrapped `input>` element.
 */
export function input<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("div", children)
}

export function h1<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h1", children)
}

/**
 * Creates A new `Avita<h2>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<h2>` element.
 */
export function h2<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h2", children)
}

/**
 * Creates A new `Avita<h3>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<h3>` element.
 */
export function h3<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h3", children)
}

/**
 * Creates A new `Avita<h4>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<h4>` element.
 */
export function h4<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h4", children)
}

/**
 * Creates A new `Avita<h5>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<h5>` element.
 */
export function h5<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h5", children)
}

/**
 * Creates A new `Avita<h6>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<h6>` element.
 */
export function h6<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("h6", children)
}

/**
 * Creates A new `Avita<p>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<p>` element.
 */
export function p<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("p", children)
}

/**
 * Creates A new `Avita<ul>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<ul>` element.
 */
export function ul<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("ul", children)
}

/**
 * Creates A new `Avita<ol>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<ol>` element.
 */
export function ol<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("ol", children)
}

/**
 * Creates A new `Avita<li>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<li>` element.
 */
export function li<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("li", children)
}

/**
 * Creates A new `Avita<img>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<img>` element.
 */
export function img<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("img", children)
}

/**
 * Creates A new `Avita<iframe>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<iframe>` element.
 */
export function iframe<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("iframe", children)
}

/**
 * Creates A new `Avita<a>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<a>` element.
 */
export function a<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("a", children)
}

/**
 * Creates A new `Avita<form>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<form>` element.
 */
export function form<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("form", children)
}

/**
 * Creates A new `Avita<input>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<input>` element.
 */
export function label<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("label", children)
}

/**
 * Creates A new `Avita<textarea>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<textarea>` element.
 */
export function textarea<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("textarea", children)
}

/**
 * Creates A new `Avita<select>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<select>` element.
 */
export function select<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("select", children)
}

/**
 * Creates A new `Avita<option>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<option>` element.
 */
export function option<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("option", children)
}

/**
 * Creates A new `Avita<table>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<table>` element.
 */
export function table<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("table", children)
}

/**
 * Creates A new `Avita<thead>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<thead>` element.
 */
export function thead<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("thead", children)
}

/**
 * Creates A new `Avita<tbody>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<tbody>` element.
 */
export function tbody<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("tbody", children)
}

/**
 * Creates A new `Avita<tr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<tr>` element.
 */
export function tr<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("tr", children)
}

/**
 * Creates A new `Avita<th>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<th>` element.
 */
export function th<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("th", children)
}

/**
 * Creates A new `Avita<td>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<td>` element.
 */
export function td<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("td", children)
}

/**
 * Creates A new `Avita<nav>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<nav>` element.
 */
export function nav<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("nav", children)
}

/**
 * Creates A new `Avita<header>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<header>` element.
 */
export function header<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("header", children)
}

/**
 * Creates A new `Avita<footer>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<footer>` element.
 */
export function footer<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("footer", children)
}

/**
 * Creates A new `Avita<section>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<section>` element.
 */
export function section<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("section", children)
}

/**
 * Creates A new `Avita<article>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<article>` element.
 */
export function article<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("article", children)
}

/**
 * Creates A new `Avita<aside>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<aside>` element.
 */
export function aside<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("aside", children)
}

/**
 * Creates A new `Avita<main>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<main>` element.
 */
export function main<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("main", children)
}

/**
 * Creates A new `Avita<figure>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<figure>` element.
 */
export function figure<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("figure", children)
}

/**
 * Creates A new `Avita<figcaption>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<figcaption>` element.
 */
export function figcaption<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("figcaption", children)
}

/**
 * Creates A new `Avita<video>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<video>` element.
 */
export function video<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("video", children)
}

/**
 * Creates A new `Avita<audio>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<audio>` element.
 */
export function audio<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("audio", children)
}

/**
 * Creates A new `Avita<source>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<source>` element.
 */
export function source<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("source", children)
}

/**
 * Creates A new `Avita<embed>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<embed>` element.
 */
export function embed<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("embed", children)
}

/**
 * Creates A new `Avita<object>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<object>` element.
 */
export function object<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("object", children)
}

/**
 * Creates A new `Avita<style>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<style>` element.
 */
export function style<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("style", children)
}

/**
 * Creates A new `Avita<head>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<head>` element.
 */
export function head<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("head", children)
}

/**
 * Creates A new `Avita<link>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<link>` element.
 */
export function link<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("link", children)
}

/**
 * Creates A new `Avita<meta>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<meta>` element.
 */
export function meta<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("meta", children)
}

/**
 * Creates A new `Avita<title>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<title>` element.
 */
export function title<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("title", children)
}

/**
 * Creates A new `Avita<base>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<base>` element.
 */
export function base<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("base", children)
}

/**
 * Creates A new `Avita<script>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<script>` element.
 */
export function script<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("script", children)
}

/**
 * Creates A new `Avita<noscript>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<noscript>` element.
 */
export function noscript<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("noscript", children)
}

/**
 * Creates A new `Avita<template>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<template>` element.
 */
export function template<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("template", children)
}

/**
 * Creates A new `Avita<html>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation. Why would this be made? It exists because it can.
 * @returns {Avita<HTMLElement>} A new `Avita<html>` element.
 */
export function html<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("html", children)
}

/**
 * Creates A new `Avita<body>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation. No clue why u would need this.
 * @returns {Avita<HTMLElement>} A new `Avita<body>` element.
 */
export function body<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("body", children)
}

/**
 * Creates a new `Avita<i>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<i>` element.
 */
export function i<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("i", children)
}

/**
 * Creates a new `Avita<b>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<b>` element.
 */
export function b<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("b", children)
}

/**
 * Creates a new `Avita<br>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<br>` element.
 */
export function br<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("br", children)
}

/**
 * Creates a new `Avita<hr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<hr>` element.
 */
export function hr<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("hr", children)
}

/**
 * Creates a new `Avita<sup>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<sup>` element.
 */
export function sup<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("sup", children)
}

/**
 * Creates a new `Avita<sub>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<sub>` element.
 */
export function sub<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("sub", children)
}

/**
 * Creates a new `Avita<em>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<em>` element.
 */
export function em<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("em", children)
}

/**
 * Creates a new `Avita<strong>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<strong>` element.
 */
export function strong<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("strong", children)
}

/**
 * Creates a new `Avita<kbd>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<kbd>` element.
 */
export function kbd<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("kbd", children)
}

/**
 * Creates a new `Avita<code>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<code>` element.
 */
export function code<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("code", children)
}

/**
 * Creates a new `Avita<samp>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<samp>` element.
 */
export function samp<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("samp", children)
}

/**
 * Creates a new `Avita<cite>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<cite>` element.
 */
export function cite<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("cite", children)
}

/**
 * Creates a new `Avita<var>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<var>` element.
 */
export function varElement<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    // 'var' is a reserved keyword
    return element("var", children)
}

/**
 * Creates a new `Avita<big>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<big>` element.
 */
export function big<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("big", children)
}

/**
 * Creates a new `Avita<small>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<small>` element.
 */
export function small<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("small", children)
}

/**
 * Creates a new `Avita<dfn>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<dfn>` element.
 */
export function dfn<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("dfn", children)
}

/**
 * Creates a new `Avita<abbr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<abbr>` element.
 */
export function abbr<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("abbr", children)
}

/**
 * Creates a new `Avita<blockquote>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<blockquote>` element.
 */
export function blockquote<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("blockquote", children)
}

/**
 * Creates a new `Avita<q>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<q>` element.
 */
export function q<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("q", children)
}

/**
 * Creates a new `Avita<time>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<time>` element.
 */
export function time<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("time", children)
}

/**
 * Creates a new `Avita<pre>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<pre>` element.
 */
export function pre<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("pre", children)
}

/**
 * Creates a new `Avita<map>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<map>` element.
 */
export function map<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("map", children)
}

/**
 * Creates a new `Avita<area>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<area>` element.
 */
export function area<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("area", children)
}

/**
 * Creates a new `Avita<canvas>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLElement>} A new `Avita<canvas>` element.
 */
export function canvas<T extends HTMLElement>(
    ...children: Children<T>
): Avita<HTMLElement> {
    return element("canvas", children)
}