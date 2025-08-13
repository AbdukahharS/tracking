<script lang="ts" setup>
import { ref, watch, computed, toRef, onMounted } from "vue";

interface Props<T = any> {
  modelValue?: T;
  trueValue?: T;
  falseValue?: T;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  size?: string | number;
  value?: any;
  color?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
}>();

const inputEl = ref<HTMLInputElement | null>(null);

const trueValue = toRef(props, "trueValue") ?? true;
const falseValue = toRef(props, "falseValue") ?? false;

const isIndeterminateProp = computed(() => !!props.indeterminate);
const disabled = computed(() => !!props.disabled);
const name = computed(() => props.name ?? "");
const valueAttr = computed(() => props.value ?? undefined);
const size = computed(() => props.size ?? 18);

const isChecked = computed(() => {
  if (props.modelValue === undefined) return false;
  return props.modelValue === (props.trueValue ?? true);
});

const ariaChecked = computed(() =>
  isIndeterminateProp.value ? "mixed" : isChecked.value ? "true" : "false"
);

watch(
  () => props.indeterminate,
  (val) => {
    if (inputEl.value) inputEl.value.indeterminate = !!val;
  },
  { immediate: true }
);

function toggle() {
  if (disabled.value) return;

  if (isIndeterminateProp.value) {
    const out = props.trueValue ?? true;
    emit("update:modelValue", out);
    emit("change", out);
    if (inputEl.value) inputEl.value.indeterminate = false;
    return;
  }

  const next = isChecked.value ? props.falseValue ?? false : props.trueValue ?? true;
  emit("update:modelValue", next);
  emit("change", next);
}

function onNativeChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const out = target.checked ? props.trueValue ?? true : props.falseValue ?? false;
  emit("update:modelValue", out);
  emit("change", out);
}

onMounted(() => {
  if (inputEl.value) inputEl.value.indeterminate = !!props.indeterminate;
});

const boxStyle = computed(() => {
  const s = typeof size.value === "number" ? `${size.value}px` : String(size.value);
  const c = props.color ?? "#2563eb";
  return {
    width: s,
    height: s,
    "--checkbox-color": c,
  };
});
</script>

<template>
  <label
    :class="[
      'base-checkbox',
      { 'is-checked': isChecked, 'is-disabled': disabled, 'is-indeterminate': indeterminate },
    ]"
  >
    <input
      ref="inputEl"
      type="checkbox"
      :name="name"
      :disabled="disabled"
      :aria-checked="ariaChecked"
      :value="valueAttr"
      :checked="isChecked"
      @change="onNativeChange"
      @keydown.space.prevent="toggle()"
      class="base-checkbox__input"
    />

    <span class="base-checkbox__box" :style="boxStyle" aria-hidden="true"></span>

    <span class="base-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  line-height: 1;
}
.base-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-checkbox__input {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}

.base-checkbox__box {
  display: inline-block; /* or grid if you want */
  border-radius: 50%;
  border: 3px solid var(--checkbox-color, #2563eb);
  background: white;
  transition: border-color 0.12s ease;
  box-sizing: border-box;
  color: var(--checkbox-color, #2563eb);
  position: relative; /* important for absolute positioning inside */
}

.base-checkbox.is-checked .base-checkbox__box::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  background-color: var(--checkbox-color, #2563eb);
  border-radius: 50%;
}

/* Indeterminate bar */
.base-checkbox.is-indeterminate .base-checkbox__box::before {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: var(--checkbox-color, #2563eb);
  border-radius: 2px;
}

.base-checkbox__label {
  font-size: 0.95rem;
  color: #111827;
}

.base-checkbox__input:focus + .base-checkbox__box,
.base-checkbox__input:focus-visible + .base-checkbox__box {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
  outline: none;
}
</style>
