import type { HTMLTag, NewChildren } from "./avita"
import Avita from "./avita"

export function element<T extends HTMLTag>(
    tag: string,
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return new Avita(tag, children)
}

/**
 * Creates A new `Avita<div>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {NewChildren<T>} children - The children of the `div` element.
 * @returns {Avita<HTMLTag>} A new Avita wrapped `div>` element.
 */
export function div<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("div", ...children)
}

/**
 * Creates a new `Avita<span>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {NewChildren<T>} children - The children of the `span` element.
 * @returns {Avita<HTMLTag>} A new Avita wrapped `span>` element.
 */
export function span<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("span", ...children)
}

/**
 * Creates a new `Avita<button>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {NewChildren<T>} children - The children of the `button` element.
 * @returns {Avita<HTMLTag>} A new Avita wrapped `button>` element.
 */
export function button<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("button", ...children)
}

/**
 * Creates a new `Avita<input>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @param {NewChildren<T>} children - The children of the `input` element.
 * @returns {Avita<HTMLTag>} A new Avita wrapped `input>` element.
 */
export function input<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("div", ...children)
}

export function h1<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h1", ...children)
}

/**
 * Creates A new `Avita<h2>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<h2>` element.
 */
export function h2<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h2", ...children)
}

/**
 * Creates A new `Avita<h3>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<h3>` element.
 */
export function h3<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h3", ...children)
}

/**
 * Creates A new `Avita<h4>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<h4>` element.
 */
export function h4<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h4", ...children)
}

/**
 * Creates A new `Avita<h5>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<h5>` element.
 */
export function h5<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h5", ...children)
}

/**
 * Creates A new `Avita<h6>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<h6>` element.
 */
export function h6<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("h6", ...children)
}

/**
 * Creates A new `Avita<p>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<p>` element.
 */
export function p<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("p", ...children)
}

/**
 * Creates A new `Avita<ul>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<ul>` element.
 */
export function ul<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("ul", ...children)
}

/**
 * Creates A new `Avita<ol>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<ol>` element.
 */
export function ol<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("ol", ...children)
}

/**
 * Creates A new `Avita<li>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<li>` element.
 */
export function li<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("li", ...children)
}

/**
 * Creates A new `Avita<img>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<img>` element.
 */
export function img<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("img", ...children)
}

/**
 * Creates A new `Avita<iframe>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<iframe>` element.
 */
export function iframe<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("iframe", ...children)
}

/**
 * Creates A new `Avita<a>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<a>` element.
 */
export function a<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("a", ...children)
}

/**
 * Creates A new `Avita<form>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<form>` element.
 */
export function form<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("form", ...children)
}

/**
 * Creates A new `Avita<input>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<input>` element.
 */
export function label<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("label", ...children)
}

/**
 * Creates A new `Avita<textarea>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<textarea>` element.
 */
export function textarea<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("textarea", ...children)
}

/**
 * Creates A new `Avita<select>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<select>` element.
 */
export function select<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("select", ...children)
}

/**
 * Creates A new `Avita<option>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<option>` element.
 */
export function option<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("option", ...children)
}

/**
 * Creates A new `Avita<table>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<table>` element.
 */
export function table<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("table", ...children)
}

/**
 * Creates A new `Avita<thead>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<thead>` element.
 */
export function thead<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("thead", ...children)
}

/**
 * Creates A new `Avita<tbody>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<tbody>` element.
 */
export function tbody<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("tbody", ...children)
}

/**
 * Creates A new `Avita<tr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<tr>` element.
 */
export function tr<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("tr", ...children)
}

/**
 * Creates A new `Avita<th>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<th>` element.
 */
export function th<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("th", ...children)
}

/**
 * Creates A new `Avita<td>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<td>` element.
 */
export function td<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("td", ...children)
}

/**
 * Creates A new `Avita<nav>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<nav>` element.
 */
export function nav<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("nav", ...children)
}

/**
 * Creates A new `Avita<header>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<header>` element.
 */
export function header<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("header", ...children)
}

/**
 * Creates A new `Avita<footer>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<footer>` element.
 */
export function footer<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("footer", ...children)
}

/**
 * Creates A new `Avita<section>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<section>` element.
 */
export function section<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("section", ...children)
}

/**
 * Creates A new `Avita<article>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<article>` element.
 */
export function article<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("article", ...children)
}

/**
 * Creates A new `Avita<aside>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<aside>` element.
 */
export function aside<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("aside", ...children)
}

/**
 * Creates A new `Avita<main>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<main>` element.
 */
export function main<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("main", ...children)
}

/**
 * Creates A new `Avita<figure>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<figure>` element.
 */
export function figure<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("figure", ...children)
}

/**
 * Creates A new `Avita<figcaption>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<figcaption>` element.
 */
export function figcaption<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("figcaption", ...children)
}

/**
 * Creates A new `Avita<video>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<video>` element.
 */
export function video<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("video", ...children)
}

/**
 * Creates A new `Avita<audio>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<audio>` element.
 */
export function audio<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("audio", ...children)
}

/**
 * Creates A new `Avita<source>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<source>` element.
 */
export function source<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("source", ...children)
}

/**
 * Creates A new `Avita<embed>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<embed>` element.
 */
export function embed<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("embed", ...children)
}

/**
 * Creates A new `Avita<object>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<object>` element.
 */
export function object<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("object", ...children)
}

/**
 * Creates A new `Avita<style>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<style>` element.
 */
export function style<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("style", ...children)
}

/**
 * Creates A new `Avita<head>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<head>` element.
 */
export function head<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("head", ...children)
}

/**
 * Creates A new `Avita<link>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<link>` element.
 */
export function link<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("link", ...children)
}

/**
 * Creates A new `Avita<meta>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<meta>` element.
 */
export function meta<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("meta", ...children)
}

/**
 * Creates A new `Avita<title>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<title>` element.
 */
export function title<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("title", ...children)
}

/**
 * Creates A new `Avita<base>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<base>` element.
 */
export function base<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("base", ...children)
}

/**
 * Creates A new `Avita<script>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<script>` element.
 */
export function script<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("script", ...children)
}

/**
 * Creates A new `Avita<noscript>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<noscript>` element.
 */
export function noscript<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("noscript", ...children)
}

/**
 * Creates A new `Avita<template>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<template>` element.
 */
export function template<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("template", ...children)
}

/**
 * Creates A new `Avita<html>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation. Why would this be made? It exists because it can.
 * @returns {Avita<HTMLTag>} A new `Avita<html>` element.
 */
export function html<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("html", ...children)
}

/**
 * Creates A new `Avita<body>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation. No clue why u would need this.
 * @returns {Avita<HTMLTag>} A new `Avita<body>` element.
 */
export function body<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("body", ...children)
}

/**
 * Creates a new `Avita<i>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<i>` element.
 */
export function i<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("i", ...children)
}

/**
 * Creates a new `Avita<b>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<b>` element.
 */
export function b<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("b", ...children)
}

/**
 * Creates a new `Avita<br>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<br>` element.
 */
export function br<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("br", ...children)
}

/**
 * Creates a new `Avita<hr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<hr>` element.
 */
export function hr<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("hr", ...children)
}

/**
 * Creates a new `Avita<sup>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<sup>` element.
 */
export function sup<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("sup", ...children)
}

/**
 * Creates a new `Avita<sub>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<sub>` element.
 */
export function sub<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("sub", ...children)
}

/**
 * Creates a new `Avita<em>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<em>` element.
 */
export function em<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("em", ...children)
}

/**
 * Creates a new `Avita<strong>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<strong>` element.
 */
export function strong<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("strong", ...children)
}

/**
 * Creates a new `Avita<kbd>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<kbd>` element.
 */
export function kbd<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("kbd", ...children)
}

/**
 * Creates a new `Avita<code>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<code>` element.
 */
export function code<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("code", ...children)
}

/**
 * Creates a new `Avita<samp>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<samp>` element.
 */
export function samp<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("samp", ...children)
}

/**
 * Creates a new `Avita<cite>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<cite>` element.
 */
export function cite<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("cite", ...children)
}

/**
 * Creates a new `Avita<var>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<var>` element.
 */
export function varElement<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    // 'var' is a reserved keyword
    return element("var", ...children)
}

/**
 * Creates a new `Avita<big>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<big>` element.
 */
export function big<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("big", ...children)
}

/**
 * Creates a new `Avita<small>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<small>` element.
 */
export function small<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("small", ...children)
}

/**
 * Creates a new `Avita<dfn>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<dfn>` element.
 */
export function dfn<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("dfn", ...children)
}

/**
 * Creates a new `Avita<abbr>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<abbr>` element.
 */
export function abbr<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("abbr", ...children)
}

/**
 * Creates a new `Avita<blockquote>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<blockquote>` element.
 */
export function blockquote<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("blockquote", ...children)
}

/**
 * Creates a new `Avita<q>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<q>` element.
 */
export function q<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("q", ...children)
}

/**
 * Creates a new `Avita<time>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<time>` element.
 */
export function time<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("time", ...children)
}

/**
 * Creates a new `Avita<pre>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<pre>` element.
 */
export function pre<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("pre", ...children)
}

/**
 * Creates a new `Avita<map>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<map>` element.
 */
export function map<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("map", ...children)
}

/**
 * Creates a new `Avita<area>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<area>` element.
 */
export function area<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("area", ...children)
}

/**
 * Creates a new `Avita<canvas>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<canvas>` element.
 */
export function canvas<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("canvas", ...children)
}

/**
 * Creates a new `Avita<svg>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<svg>` element.
 */
export function svg<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("svg", ...children)
}

/**
 * Creates a new `Avita<path>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<path>` element.
 */
export function path<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("path", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<rect>` element.
 */
export function rect<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("rect", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<HTMLTag>` element.
 */
export function circle<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("circle", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<ellipse>` element.
 */
export function ellipse<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("ellipse", ...children)
}
/**
 * Creates a new `Avita<line>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<line>` element.
 */
export function line<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("line", ...children)
}

/**
 * Creates a new `Avita<polygon>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<polygon>` element.
 */
export function polygon<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("polygon", ...children)
}

/**
 * Creates a new `Avita<polyline>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<polyline>` element.
 */
export function polyline<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("polyline", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<text>` element.
 */
export function text<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("text", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<textPath>` element.
 */
export function textPath<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("textPath", ...children)
}

/**
 * Creates a new `Avita<marker>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<marker>` element.
 */
export function marker<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("marker", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<symbol>` element.
 */
export function symbol<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("symbol", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<image>` element.
 */
export function image<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("image", ...children)
}

/**
 * Creates a new `Avita<clipPath>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<clipPath>` element.
 */
export function clipPath<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("clipPath", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<mask>` element.
 */
export function mask<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("mask", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<pattern>` element.
 */
export function pattern<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("pattern", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<filter>` element.
 */
export function filter<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("filter", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<linearGradient>` element.
 */
export function linearGradient<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("linearGradient", ...children)
}

/**
 * Creates a new `Avita<HTMLTag>` element. Has properties of AvitaElement
 * to allow for seamless DOM manipulation.
 * @returns {Avita<HTMLTag>} A new `Avita<radialGradient>` element.
 */
export function radialGradient<T extends HTMLTag>(
    ...children: NewChildren<T>
): Avita<HTMLTag> {
    return element("radialGradient", ...children)
}

// interface HTMLElementTagNameMap {
//     "a": HTMLAnchorElement;
//     "abbr": HTMLElement;
//     "address": HTMLElement;
//     "area": HTMLAreaElement;
//     "article": HTMLElement;
//     "aside": HTMLElement;
//     "audio": HTMLAudioElement;
//     "b": HTMLElement;
//     "base": HTMLBaseElement;
//     "bdi": HTMLElement;
//     "bdo": HTMLElement;
//     "blockquote": HTMLQuoteElement;
//     "body": HTMLBodyElement;
//     "br": HTMLBRElement;
//     "button": HTMLButtonElement;
//     "canvas": HTMLCanvasElement;
//     "caption": HTMLTableCaptionElement;
//     "cite": HTMLElement;
//     "code": HTMLElement;
//     "col": HTMLTableColElement;
//     "colgroup": HTMLTableColElement;
//     "data": HTMLDataElement;
//     "datalist": HTMLDataListElement;
//     "dd": HTMLElement;
//     "del": HTMLModElement;
//     "details": HTMLDetailsElement;
//     "dfn": HTMLElement;
//     "dialog": HTMLDialogElement;
//     "div": HTMLDivElement;
//     "dl": HTMLDListElement;
//     "dt": HTMLElement;
//     "em": HTMLElement;
//     "embed": HTMLEmbedElement;
//     "fieldset": HTMLFieldSetElement;
//     "figcaption": HTMLElement;
//     "figure": HTMLElement;
//     "footer": HTMLElement;
//     "form": HTMLFormElement;
//     "h1": HTMLHeadingElement;
//     "h2": HTMLHeadingElement;
//     "h3": HTMLHeadingElement;
//     "h4": HTMLHeadingElement;
//     "h5": HTMLHeadingElement;
//     "h6": HTMLHeadingElement;
//     "head": HTMLHeadElement;
//     "header": HTMLElement;
//     "hgroup": HTMLElement;
//     "hr": HTMLHRElement;
//     "html": HTMLHtmlElement;
//     "i": HTMLElement;
//     "iframe": HTMLIFrameElement;
//     "img": HTMLImageElement;
//     "input": HTMLInputElement;
//     "ins": HTMLModElement;
//     "kbd": HTMLElement;
//     "label": HTMLLabelElement;
//     "legend": HTMLLegendElement;
//     "li": HTMLLIElement;
//     "link": HTMLLinkElement;
//     "main": HTMLElement;
//     "map": HTMLMapElement;
//     "mark": HTMLElement;
//     "menu": HTMLMenuElement;
//     "meta": HTMLMetaElement;
//     "meter": HTMLMeterElement;
//     "nav": HTMLElement;
//     "noscript": HTMLElement;
//     "object": HTMLObjectElement;
//     "ol": HTMLOListElement;
//     "optgroup": HTMLOptGroupElement;
//     "option": HTMLOptionElement;
//     "output": HTMLOutputElement;
//     "p": HTMLParagraphElement;
//     "picture": HTMLPictureElement;
//     "pre": HTMLPreElement;
//     "progress": HTMLProgressElement;
//     "q": HTMLQuoteElement;
//     "rp": HTMLElement;
//     "rt": HTMLElement;
//     "ruby": HTMLElement;
//     "s": HTMLElement;
//     "samp": HTMLElement;
//     "script": HTMLScriptElement;
//     "search": HTMLElement;
//     "section": HTMLElement;
//     "select": HTMLSelectElement;
//     "slot": HTMLSlotElement;
//     "small": HTMLElement;
//     "source": HTMLSourceElement;
//     "span": HTMLSpanElement;
//     "strong": HTMLElement;
//     "style": HTMLStyleElement;
//     "sub": HTMLElement;
//     "summary": HTMLElement;
//     "sup": HTMLElement;
//     "table": HTMLTableElement;
//     "tbody": HTMLTableSectionElement;
//     "td": HTMLTableCellElement;
//     "template": HTMLTemplateElement;
//     "textarea": HTMLTextAreaElement;
//     "tfoot": HTMLTableSectionElement;
//     "th": HTMLTableCellElement;
//     "thead": HTMLTableSectionElement;
//     "time": HTMLTimeElement;
//     "title": HTMLTitleElement;
//     "tr": HTMLTableRowElement;
//     "track": HTMLTrackElement;
//     "u": HTMLElement;
//     "ul": HTMLUListElement;
//     "var": HTMLElement;
//     "video": HTMLVideoElement;
//     "wbr": HTMLElement;
// }
