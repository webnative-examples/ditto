<script lang="ts">
  import { onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'

  import { limits, process } from '$lib/audio/delay.js'
  import { patchStore } from '../../stores.js'
  import { objectEntries, translateToRange } from '$lib/utils.js'
  import type { Channels, Params } from '$lib/audio'
  import type { Patch } from '$lib/patch'
  import Knob from '$components/controls/Knob.svelte'

  export let input: Channels
  export let render: (channels: Channels) => void

  let patch: Patch
  let selectedParam: keyof Params | null = null

  const params: Params = {
    delayTime: {
      label: 'Time',
      min: 0,
      max: 1000,
      unitLabel: 'ms'
    },
    feedback: {
      label: 'Feedback',
      min: 0,
      max: 100,
      unitLabel: '%'
    },
    mix: {
      label: 'Mix',
      min: 0,
      max: 100,
      unitLabel: '%'
    }
  }

  const unsubscribePatchStore = patchStore.subscribe(val => {
    patch = val
  })

  onDestroy(unsubscribePatchStore)

  function selectParam(event: CustomEvent<{ id: keyof typeof params }>) {
    const { id } = event.detail

    selectedParam = id
  }

  function unselectParam(event: CustomEvent<{ id: keyof typeof params }>) {
    const { id } = event.detail

    if (id === selectedParam) {
      selectedParam = null
    }
  }

  function setParam(
    event: CustomEvent<{ id: keyof typeof params; value: number }>
  ) {
    if (selectedParam === null) return

    const { id, value } = event.detail

    switch (id) {
      case 'delayTime':
        patch.params.delayTime = value
        break

      case 'feedback':
        patch.params.feedback = value
        break

      case 'mix':
        patch.params.mix = value
        break
    }

    patchStore.set(patch)
  }

  $: {
    const feedback = translateToRange({
      num: patch.params.feedback,
      original: { min: 0, max: 100 },
      scaled: { min: limits.feedback.min, max: limits.feedback.max }
    })

    const mix = translateToRange({
      num: patch.params.mix,
      original: { min: 0, max: 100 },
      scaled: { min: limits.mix.min, max: limits.mix.max }
    })

    render(
      process({
        input,
        delayTime: patch.params.delayTime,
        feedback,
        mix
      })
    )
  }
</script>
<div class="flex flex-col items-center justify-center gap-8 min-h-[calc(100vh-150px)]">
  <div class="relative grid-container grid grid-cols-3 gap-4 mx-auto">
    {#each objectEntries(params) as [id, param], i}
      <div in:fly={{ y: 20, delay: 0+(i*50), duration: 350 }}>
        <Knob
          {id}
          label={param.label}
          bind:value={patch.params[id]}
          min={param.min}
          max={param.max}
          unitLabel={param.unitLabel}
          selected={selectedParam === id}
          on:mousedown={selectParam}
          on:mouseup={unselectParam}
          on:input={setParam}
        />
      </div>
    {/each}
  </div>
</div>
